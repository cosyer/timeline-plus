console.log("controller");

/**
 * 生成 html 代码
 * @param  {Array} dataArr 数组
 * @return {[type]}         [description]
 */
var cardGenerator = function(dataArr) {
  var oBody = document.getElementById("body");
  var htmlStr = [
    '<h1 class="title">Love Story</h1>',
    '<div id="elapseClock"></div>',
    '<div class="time"></div>'
  ];

  for (var i = 0; i < dataArr.length; i++) {
    if (i % 2 === 0) {
      htmlStr.push('<div class="card left">');
      htmlStr.push("<h2>" + dataArr[i].title + " " + dataArr[i].date + "</h2>");
    } else {
      htmlStr.push('<div class="card right">');
      htmlStr.push("<h2>" + dataArr[i].date + " " + dataArr[i].title + "</h2>");
    }
    htmlStr.push('<div class="circle"></div>');
    htmlStr.push('<div class="pic-words">');
    htmlStr.push('<img src="' + dataArr[i].img + '" alt="">');
    htmlStr.push("<p>" + dataArr[i].content + "</p>");
    htmlStr.push("</div></div>");
  }

  oBody.innerHTML = htmlStr.join("");
};

cardGenerator(together);

function getDaysInMonth(month) {
  var data = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return data[month];
}

function timeElapse(date, mode) {
  var current = new Date();
  var years = NaN;
  var month = NaN;
  var days = NaN;
  var hours = NaN;
  var minutes = NaN;
  var seconds = NaN;
  if (mode == 1) {
    years = current.getFullYear() - date.getFullYear();
    if (years > 0) {
      current.setYear(current.getFullYear() - years);
    }
    months = current.getMonth() - date.getMonth();
    if (months > 0) {
      current.setMonth(current.getMonth() - months);
    }
    days = current.getDate() - date.getDate();
    if (days > 0) {
      current.setDate(current.getDate() - months);
    }
  }
  seconds = Math.round((current.getTime() - date.getTime()) / 1000);
  if (isNaN(days)) {
    days = Math.floor(seconds / (3600 * 24));
  }
  seconds = seconds % (3600 * 24);
  hours = Math.floor(seconds / 3600);
  seconds = seconds % 3600;
  minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;

  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }
  if (minutes < 0) {
    minutes += 60;
    hours--;
  }
  if (hours < 0) {
    hours += 24;
    days--;
  }
  if (days < 0) {
    days += getDaysInMonth(new Date().getMonth());
    months--;
  }
  if (months < 0) {
    months += 12;
    years--;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  var result = "";
  if (mode == 1) {
    result =
      (years > 0 ? '❤ <span class="digit">' + years + "</span> 年 " : "") +
      (months >= 0 ? '<span class="digit">' + months + "</span> 月 " : "") +
      '<span class="digit">' +
      days +
      "</span> 天 " +
      '<span class="digit">' +
      hours +
      "</span> 时 " +
      '<span class="digit">' +
      minutes +
      "</span> 分 " +
      '<span class="digit">' +
      seconds +
      "</span> 秒 ❤";
  } else {
    result =
      '❤ <span class="digit">' +
      days +
      '</span> 天 <span class="digit">' +
      hours +
      '</span> 时 <span class="digit">' +
      minutes +
      '</span> 分 <span class="digit">' +
      seconds +
      "</span> 秒 ❤";
  }

  $("#elapseClock").html(result);
}
