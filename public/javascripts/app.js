var app = angular.module('gymFitness', ['toaster', 'ngAnimate','moment-picker','datatables']);
app.config(['momentPickerProvider', function (momentPickerProvider) {
        moment.locale('he');
        momentPickerProvider.options({
            
            locale:        'he',
            leftArrow:     '&rarr;',
            rightArrow:    '&larr;' 
            /*startView:     'year',
            autoclose:     true,
            today:         false,
            keyboard:      false,
            
            
            leftArrow:     '&larr;',
            rightArrow:    '&rarr;',
            yearsFormat:   'YYYY',
            monthsFormat:  'MMM',
            daysFormat:    'D',
            hoursFormat:   'HH:[00]',
            minutesFormat: moment.localeData().longDateFormat('LT').replace(/[aA]/, ''),
            secondsFormat: 'ss',
            minutesStep:   5,
            secondsStep:   1*/
        });
    }]);

moment.locale('he');
 

app.value('clientStatus', {
        active: 0,
        pause: 1,
        deleted:2
    }).value('clientPrograms', {
        '0':'1 חודשים' ,
        '1':'2 חודשים' ,
        '2':'3 חודשים' ,
        '3':'6 חודשים' ,
        '4':'12 חודשים' ,
        '5':'24 חודשים' 
    }).value('clientActiveStatus', {
        '0':'פעיל' ,
        '1':'אידל' ,
        '2':'נמחק' ,
    })
    .value('restApi', {
        client: "/clientApi",
        reports:"/reportsApi",
        users:"/usersApi"
    })
    .value('appPages', {
        clients: "/clients",
        payments: "/payments",
        users:"/users"       
    }).value('appMessages', {
        saveSuccess: "נשמר בהצלחה",
        saveError: "נכשל בשמירה",
        loadError:"נכשל בטעינה",
        invalidUsernameOrPassword:"נא לוודא שם משתמש או סיסמה"
    })
    .constant('DATE_FORMAT','DD/MM/YYYY' );
    

app.run(function($rootScope) {
   $rootScope.COPYRIGHT_YEAR=new window.Date().getFullYear();
});