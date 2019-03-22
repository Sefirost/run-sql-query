(function($) {
  'use strict';

  function cleanText(text) {
    text = text.replace(/"/g, '""');
    return '"' + text + '"';
  }

  function tableToCSV($table) {
    var header = [];
    var rows = [];

    $table.find('tr').each(function() {
      var data = [];
      $(this)
        .find('th')
        .each(function() {
          var text = cleanText($(this).text());
          header.push(text);
        });
      $(this)
        .find('td')
        .each(function() {
          var text = cleanText($(this).text());
          data.push(text);
        });
      data = data.join(',');
      rows.push(data);
    });
    header = header.join(',');
    rows = rows.join('\n');

    var csv = header + rows;
    var ts = new Date().getTime();
    saveFile(
      'query_results_' + ts + '.csv',
      csv,
      'application/csv;charset=utf-8'
    );
  }

  function saveFile(fileName, data, type) {
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
      try {
        var isFileSaverSupported = !!new Blob();
        if (isFileSaverSupported) {
          var dataBlob = new Blob([data], {
            type: type
          });
          window.navigator.msSaveBlob(dataBlob, fileName);
        }
      } catch (e) {
        console.log('No blobs supported!');
      }
    } else {
      var downloadLink = document.createElement('a');
      downloadLink.style.display = 'none';
      downloadLink.href = 'data:' + type + ',' + encodeURIComponent(data);
      downloadLink.download = fileName;
      downloadLink.onclick = function(e) {
        document.body.removeChild(e.target);
      };
      document.body.appendChild(downloadLink);
      downloadLink.click();
    }
  }

  function check_sql_query() {
    if (
      $('#query')
        .val()
        .match(
          /\s*(alter|create|drop|rename|insert|delete|update|replace|truncate) /i
        )
    ) {
      return confirm(
        'No UNDO is available for data modification. Do you want to continue?'
      );
    } else {
      return true;
    }
  }

  function run_sql_query() {
    $('#error').hide();
    $('#results').hide();
    $('#export_button').hide();
    $('#status').show();
    $('#loading_gif').show();
    $('#status_detail').html('Running...');

    var query = $('#query')
      .val()
      .replace(/(\r\n|\n|\r)/gm, ' ');

    var data = {
      action: 'run_sql_query',
      security: $('#_wpnonce').val(),
      query: query
    };

    $.post(ajaxurl, data, function(response) {
      if (response.success) {
        $('#raw_query').html(query);
        if (typeof response.data.affected_rows !== 'undefined') {
          $('#results_detail').html(
            response.data.affected_rows + ' row(s) affected'
          );
          $('#results').show();
        } else {
          if (response.data.rows == 0) {
            $('#results_detail').html('No results');
          } else {
            $('#results_detail').html('');
            $.jsontotable(response.data.rows, {
              id: '#results_detail',
              header: true
            });
            $('#export_button').show();
          }
          $('#results').show();
        }
      } else {
        $('#error').show();
        $('#error_detail').html(response.data.error);
      }
    }).always(function() {
      $('#loading_gif').hide();
      $('#status_detail').html('Completed');
    });
  }

  $(function() {
    $('#table').on('change', function() {
      $('#query').val(
        'SELECT FIRST_NAME, LAST_NAME, EMAIL, Count(*) AS CNT FROM ' +
          this.value +
          ' GROUP BY FIRST_NAME, LAST_NAME HAVING COUNT(*) > 1 '
      );
      run_sql_query();
    });

    $('#run_query_button').on('click', function() {
      if (check_sql_query()) {
        run_sql_query();
      }
    });

    $('#export_button').on('click', function(event) {
      tableToCSV($('#results_detail table'));
    });
  });
})(jQuery);
