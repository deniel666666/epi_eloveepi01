// var dateNumArr=[]; // 

(function($){$.fn.dnCalendar=function(options){var self=$(this);var settings={};var currDate=new Date();var defDate=null;var todayDate=new Date();var weekNames=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];var weekNamesHasAlreadySorted=!1;Array.prototype.move=function(old_index,new_index){while(old_index<0){old_index+=this.length}
while(new_index<0){new_index+=this.length}
if(new_index>=this.length){var k=new_index-this.length;while((k--)+1){this.push(undefined)}}
this.splice(new_index,0,this.splice(old_index,1)[0]);return this};var getDayIndexOfWeek=function(){for(var i=0;i<weekNames.length;i++){if(weekNames[i]==settings.startWeek.toLowerCase()){return i}}
return 0}
var weekCount=function(year,month_number){var firstOfMonth=new Date(year,month_number-1,1);var lastOfMonth=new Date(year,month_number,0);var used=firstOfMonth.getDay()+lastOfMonth.getDate();return Math.ceil(used/7)}
var getWeekOfMonth=function(month,year){var weeks=[],firstDate=new Date(year,month,1),lastDate=new Date(year,month+1,0),numDays=lastDate.getDate(),startDayWeek=getDayIndexOfWeek();var lastDateOfPrevMonth=new Date(year,month,0);var prevDate=lastDateOfPrevMonth.getDate()-firstDate.getDay();var firstDateOfNextMonth=new Date(year,month+1,1);var nextDate=firstDateOfNextMonth.getDate();var date=1;while(date<=numDays){var i=0;var tempWeek=[];while(i<7){if(weeks.length==0){if(i>=firstDate.getDay()){tempWeek.push(date);date++}else{prevDate++;tempWeek.push(prevDate)}}else{if(date<=numDays){tempWeek.push(date);date++}else{tempWeek.push(nextDate++)}}
i++}
weeks.push(tempWeek)}
// console.log("numDays",numDays);
return weeks}
var sortingBySelectedDay=function(weeks,month,year){var startDayWeek=getDayIndexOfWeek();var lastDateOfPrevMonth=new Date(year,month,0);var prevDate=lastDateOfPrevMonth.getDate();var lastDate=new Date(year,month+1,0).getDate();function isset(arr,val){var found=!1;for(var m=0;m<arr.length;m++){if(arr[m]==val){found=!0;break}}
return found}
if(startDayWeek>0){var newArr=[];var nWeeks=weeks.length;for(var i=0;i<nWeeks;i++){var tempArr=[];if(i==0&&newArr.length==0){if(weeks[i][0]==1){var startPrevDate=prevDate-(7-startDayWeek-1);while(startPrevDate<=prevDate){tempArr.push(startPrevDate);startPrevDate++}
for(var j=0;j<weeks[i].length;j++){if(tempArr.length<weeks[i].length){var val=weeks[i][j];var isPush=isset(tempArr,val);if(!isPush){tempArr.push(val)}}}}else{for(var j=0;j<weeks[i].length;j++){if(tempArr.length<weeks[i].length){if(typeof weeks[i][j+startDayWeek]!=='undefined'){tempArr.push(weeks[i][j+startDayWeek])}else{if(typeof weeks[i+1]!=='undefined'){for(var k=0;k<weeks[i+1].length;k++){if(tempArr.length<weeks[i].length){var val=weeks[i+1][k];var isPush=isset(tempArr,val);if(!isPush){tempArr.push(val)}}}}}}}}}else{for(var newI=i;newI>=0;newI--){var found=!1;for(var j=0;j<weeks[newI].length;j++){var newArrRow=newArr.length-1;var newArrCol=newArr[newArrRow].length-1;if(newArr[newArrRow][newArrCol]==weeks[newI][j]){found=!0}
if(found==!0){if(typeof weeks[newI][j+startDayWeek]!=='undefined'){if(tempArr.length<weeks[newI].length){var val=weeks[newI][j+startDayWeek];var isPush=isset(tempArr,val);if(!isPush){if(typeof tempArr[tempArr.length-1]!=='undefined'){var lastIndexTempArr=tempArr[tempArr.length-1];if(lastIndexTempArr+1!=val&&lastIndexTempArr+1<lastDate){tempArr.push(lastIndexTempArr+1)}else{tempArr.push(weeks[newI][j+startDayWeek])}}else{tempArr.push(weeks[newI][j+startDayWeek])}}}}else{if(typeof weeks[newI+1]!=='undefined'){for(var k=0;k<weeks[newI+1].length;k++){if(tempArr.length<weeks[newI].length){var val=weeks[newI+1][k];var isPush=isset(tempArr,val);if(!isPush){tempArr.push(val)}}}}}}}}}
newArr.push(tempArr)}
var found=!1;for(var i=1;i<newArr.length;i++){for(var j=0;j<newArr[i].length;j++){if(newArr[i][j]==lastDate){found=!0;break}}
if(found==!0){break}}
var newArrRow=newArr.length-1;if(found==!1){var newArrCol=newArr[newArrRow].length-1;var lastDateInNewArr=newArr[newArrRow][newArrCol];var tempArr=[];while(lastDateInNewArr<lastDate){lastDateInNewArr++;tempArr.push(lastDateInNewArr)}
if(tempArr.length<7){var limit=7-tempArr.length;var date=1;while(date<=limit){tempArr.push(date);date++}}
newArr.push(tempArr)}else{var newArrCol=newArr[newArrRow].length-1;var lastDateInNewArr=newArr[newArrRow][newArrCol];var colLeft=7-(newArrCol+1);if(lastDateInNewArr>7){lastDateInNewArr=1}else{lastDateInNewArr=lastDateInNewArr+1}
while(colLeft>0){newArr[newArrRow].push(lastDateInNewArr);lastDateInNewArr++;colLeft--}
console.log("newArrCol",newArrCol);console.log("colLeft",colLeft)}
return newArr}
return weeks}
var draw=function(){var m=currDate.getMonth();var d=currDate.getDate();var y=currDate.getFullYear();var dates=getWeekOfMonth(m,y);for(var i=0;i<dates.length;i++){var string="";for(var j=0;j<dates[i].length;j++){string+=dates[i][j]+" "}
// console.log(i+" => "+string)
};
// console.log("--------------------------------");
dates=sortingBySelectedDay(dates,m,y);for(var i=0;i<dates.length;i++){var string="";for(var j=0;j<dates[i].length;j++){string+=dates[i][j]+" "}
// console.log(i+" => "+string)
}
var headerMonth=settings.monthNames[m];if(settings.monthUseShortName==!0){headerMonth=settings.monthNamesShort[m]}
var headerGroup=$("<div id='dncalendar-header' class='dncalendar-header'></div>");headerGroup.append("<h2>"+headerMonth+" "+y+"</h2>");var prevInactive=!1;var minDate=null;if(typeof settings.minDate!=='undefined'){var minDateArr=settings.minDate.split('-');minDate=new Date(minDateArr[0],minDateArr[1]-1,minDateArr[2]);if(minDate.getFullYear()>=y){if(minDate.getMonth()>=m){prevInactive=!0}}}
var nextInactive=!1;var maxDate=null;if(typeof settings.maxDate!=='undefined'){var maxDateArr=settings.maxDate.split('-');maxDate=new Date(maxDateArr[0],maxDateArr[1]-1,maxDateArr[2]);if(maxDate.getFullYear()<=y){if(maxDate.getMonth()<=m){nextInactive=!0}}}
var calendarLinksGroup=$("<div id='dncalendar-links' class='dncalendar-links'></div>");var prevLinkGroup=$("<div id='dncalendar-prev-month' class='dncalendar-prev-month'></div>");var nextLinkGroup=$("<div id='dncalendar-next-month' class='dncalendar-next-month'></div>");if(prevInactive){prevLinkGroup.addClass("dncalendar-inactive");prevLinkGroup.removeAttr("id")}
if(nextInactive){nextLinkGroup.addClass("dncalendar-inactive");nextLinkGroup.removeAttr("id")}
calendarLinksGroup.append(prevLinkGroup);calendarLinksGroup.append(nextLinkGroup);headerGroup.append(calendarLinksGroup);var bodyGroup=$("<div id='dncalendar-body' class='dncalendar-body'></div>");var tableGroup=$("<table></table>");var weekName=settings.dayNames;if(settings.dayUseShortName==!0){weekName=settings.dayNamesShort}
var dayIndex=getDayIndexOfWeek();if(weekNamesHasAlreadySorted==!1){var oldIndex=null;var newIndex=0;for(var i=0;i<weekName.length;i++){if(i>=dayIndex){if(oldIndex==null){oldIndex=i}
weekName.move(oldIndex,newIndex);oldIndex++;newIndex++}}
weekNamesHasAlreadySorted=!0}
// console.log("week after",weekName);
var sundayIndex=(dayIndex==0)?0:7-dayIndex;var saturdayIndex=6-dayIndex;var tableHeadGroup=$("<thead></thead>");var tableHeadRowGroup=$("<tr></tr>");var weekNameLength=weekName.length;for(var i=0;i<weekNameLength;i++){tableHeadRowGroup.append("<td "+((i==sundayIndex||i==saturdayIndex)?'class=\"holiday\"':'')+">"+weekName[i]+"</td>")}
tableHeadGroup.append(tableHeadRowGroup);var tableBodyGroup=$("<tbody></tbody>");var totalWeeks=weekCount(y,m+1);//console.log("totalWeeks",totalWeeks);
var totalDaysInWeeks=7;var startDate=1;var firstDayOfMonth=new Date(y,m,1);var lastDayOfMonth=new Date(y,m+1,0);var lastDateOfPrevMonth=new Date(y,m,0);var prevDate=lastDateOfPrevMonth.getDate()-firstDayOfMonth.getDay()+1;var firstDateOfNextMonth=new Date(y,m+1,1);var nextDate=firstDateOfNextMonth.getDate();var limitMinDate=0;if(minDate!=null){limitMinDate=minDate.getDate()}
var limitMaxDate=0;if(maxDate!=null){limitMaxDate=maxDate.getDate()}
var todayTitle='today';var defaultDateTitle='default date';if(typeof settings.dataTitles!=='undefined'){if(typeof settings.dataTitles.defaultDate!=='undefined'){defaultDateTitle=settings.dataTitles.defaultDate}
if(typeof settings.dataTitles.today!=='undefined'){todayTitle=settings.dataTitles.today}}
var sundayIndex=(dayIndex==0)?0:7-dayIndex;var saturdayIndex=(dayIndex==0)?7-1:7-(dayIndex+1);
// console.log("sundayIndex",sundayIndex);console.log("saturdayIndex",saturdayIndex);
var nDates=dates.length;for(var i=0;i<nDates;i++){var tableBodyRowGroup=$("<tr></tr>");var nDate=dates[i].length;for(var j=0;j<nDate;j++){var date=dates[i][j];var month=m+1;var year=y;var colDateClass="";var colDateDataAttr="";var showCalendarClick=!0;if(i==0){if(dates[i][j]>7){showCalendarClick=!1;month=month-1;if(month<=0){month=12;year=year-1}}}
if(i==nDates-1){if(dates[i][j]<=7){showCalendarClick=!1;month=month+1;if(month>=12){month=1;year=year+1}}}
if(todayDate.getFullYear()==year&&(todayDate.getMonth()+1)==month&&todayDate.getDate()==date){colDateClass=' today-date ';colDateDataAttr="data-title='"+todayTitle+"'"}
if(defDate!=null&&defDate.getFullYear()==year&&(defDate.getMonth()+1)==month&&defDate.getDate()==date){colDateClass=' default-date ';colDateDataAttr="data-title='"+defaultDateTitle+"'"}
if(j==sundayIndex||j==saturdayIndex){colDateClass+=' holiday '}
if(typeof settings.notes!=='undefined'){if(dateIsNotes(new Date(year,month-1,date))){colDateClass+=" note "}}
var colDate="<td id='calendarClick' class='"+colDateClass+" "+((showCalendarClick==!0)?'calendarClick':'')+"' data-date='"+date+"' data-month='"+month+"' data-year='"+year+"'><div class='entry' "+colDateDataAttr+">"+date+"</div></td>";if(minDate!=null){var myCurrentDate=new Date(year,month-1,date);if(minDate>myCurrentDate){colDate="<td class='"+colDateClass+"' data-date='"+date+"' data-month='"+month+"' data-year='"+year+"'><div class='entry' "+colDateDataAttr+">"+date+"</div></td>"}}
if(maxDate!=null){var myCurrentDate=new Date(year,month-1,date);if(maxDate<myCurrentDate){colDate="<td class='"+colDateClass+"' data-date='"+date+"' data-month='"+month+"' data-year='"+year+"'><div class='entry' "+colDateDataAttr+">"+date+"</div></td>"}}
tableBodyRowGroup.append(colDate)}
tableBodyGroup.append(tableBodyRowGroup)}
var notesGroup="";if(settings.showNotes){var notes=getNotesThisMonth();var notesLength=notes.length;if(notesLength>0){notesGroup=$("<ul class='dncalendar-note-list'></ul>");
var dateNumArr=[]; // 
for(var i=0;i<notesLength;i++){var date=notes[i].date; 

dateNumArr.push(notes[i]);// 
// dateNumArr.push(date);// 
var noteList=notes[i].notes;var noteListLength=noteList.length;var list="";list+="<li class='date'>";list+="<span>"+date+"</span> ";if(noteListLength>0){list+=" : ";for(var j=0;j<noteListLength;j++){list+=noteList[j];if(noteListLength<=j){list+=", "}}}
list+="</li>";notesGroup.append(list)}}}
// console.log(dateNumArr)//
monthCount(dateNumArr);//


tableGroup.append(tableHeadGroup);tableGroup.append(tableBodyGroup);bodyGroup.append(tableGroup);self.html("");self.append(headerGroup);self.append(bodyGroup);self.append(notesGroup)}
var dateIsNotes=function(date){var notesLength=settings.notes.length;for(var i=0;i<notesLength;i++){var dateNote=settings.notes[i].date.split('-');var nDate=new Date(dateNote[0],dateNote[1]-1,dateNote[2]);if(nDate.getFullYear()==date.getFullYear()&&nDate.getMonth()==date.getMonth()&&nDate.getDate()==date.getDate()){return!0}}
return!1}
var getNotesThisMonth=function(){var result=[];var notesLength=settings.notes.length;for(var i=0;i<notesLength;i++){var dateNote=settings.notes[i].date.split('-');var nDate=new Date(dateNote[0],dateNote[1]-1,dateNote[2]);if(nDate.getFullYear()==currDate.getFullYear()&&nDate.getMonth()==currDate.getMonth()){var temp={};temp.date=nDate.getDate();temp.notes=settings.notes[i].note;result.push(temp)}}
return result}
var nextMonth=function(){var firstDateOfNextMonth=new Date(currDate.getFullYear(),currDate.getMonth()+1,1);var date=firstDateOfNextMonth.getDate();var month=firstDateOfNextMonth.getMonth();var year=firstDateOfNextMonth.getFullYear();currDate=new Date(year,month,date);draw()}
var prevMonth=function(){var firstDateOfPrevMonth=new Date(currDate.getFullYear(),currDate.getMonth()-1,1);var date=firstDateOfPrevMonth.getDate();var month=firstDateOfPrevMonth.getMonth();var year=firstDateOfPrevMonth.getFullYear();currDate=new Date(year,month,date);draw()}
var triggerAction=function(){$('body').on('click','#'+self.attr('id')+' #calendarClick',function(){var selectedDate=$(this).data('date');var selectedMonth=$(this).data('month');var selectedYear=$(this).data('year');settings.dayClick.call(this,new Date(selectedYear,selectedMonth-1,selectedDate),self)});$('body').on('click','#dncalendar-prev-month',function(){prevMonth()});$('body').on('click','#dncalendar-next-month',function(){nextMonth()})}
return{build:function(){settings=$.extend({},$.fn.dnCalendar.defaults,options);if(typeof settings.defaultDate!=='undefined'){var defaultDateArr=settings.defaultDate.split('-');currDate=new Date(defaultDateArr[0],defaultDateArr[1]-1,defaultDateArr[2]);defDate=currDate}
draw();triggerAction()},update:function(options){settings=$.extend(settings,options);if(typeof settings.defaultDate!=='undefined'){var defaultDateArr=settings.defaultDate.split('-');currDate=new Date(defaultDateArr[0],defaultDateArr[1]-1,defaultDateArr[2]);defDate=currDate}
draw()}}}
$.fn.dnCalendar.defaults={monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Okt','Nov','Dec'],dayNames:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],dayNamesShort:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],dayUseShortName:!1,monthUseShortName:!1,showNotes:!1,startWeek:'sunday',dayClick:function(date,view){}}}(jQuery))