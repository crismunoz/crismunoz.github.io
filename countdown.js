(function($) {
	$.fn.countdown = function(options, callback) {

		//Selector personalizado 'this'
		thisEl = $(this);

		//vector para las configuraciones
		var settings = { 
			'date': null,
			'format': null
		};

		//añade las configuraciones al vector de opciones
		if(options) {
			$.extend(settings, options);
		}
		
		//funcion principal countdown 
		function countdown_proc() {
			
			eventDate = Date.parse(settings['date']) / 1000;
			currentDate = Math.floor($.now() / 1000);
			
			if(eventDate <= currentDate) {
				callback.call(this);
				clearInterval(interval);
			}
			
			seconds = eventDate - currentDate;
			
			days = Math.floor(seconds / (60 * 60 * 24)); //Calcula el numero de dias
			seconds -= days * 60 * 60 * 24; //Actualiza la variable segundos con el numero de dias eliminados
			
			hours = Math.floor(seconds / (60 * 60));
			seconds -= hours * 60 * 60; //Actualiza la variable segundos con el numero de dias eliminadas
			
			minutes = Math.floor(seconds / 60);
			seconds -= minutes * 60; //Actualiza la variable segundos con el numero de minutos eliminados
			
			//Condicional para mostrar el texto
			if (days == 1) { thisEl.find(".timeRefDays").text("Dia"); } else { thisEl.find(".timeRefDays").text("Dias"); }
			if (hours == 1) { thisEl.find(".timeRefHours").text("Hora"); } else { thisEl.find(".timeRefHours").text("Horas"); }
			if (minutes == 1) { thisEl.find(".timeRefMinutes").text("Minuto"); } else { thisEl.find(".timeRefMinutes").text("Minutos"); }
			if (seconds == 1) { thisEl.find(".timeRefSeconds").text("Segundo"); } else { thisEl.find(".timeRefSeconds").text("Segundos"); }
			
			//Logica para los dos digitos cuando la configuracion esta en "ON" activada
			if(settings['format'] == "on") {
				days = (String(days).length >= 2) ? days : "0" + days;
				hours = (String(hours).length >= 2) ? hours : "0" + hours;
				minutes = (String(minutes).length >= 2) ? minutes : "0" + minutes;
				seconds = (String(seconds).length >= 2) ? seconds : "0" + seconds;
			}
			
			//Actualizar el countdown's los valores HTML.
			if(!isNaN(eventDate)) {
				thisEl.find(".days").text(days);
				thisEl.find(".hours").text(hours);
				thisEl.find(".minutes").text(minutes);
				thisEl.find(".seconds").text(seconds);
			} else { 
				alert("Fecha invalida. Aqui tienes un ejemplo: 12 Tuesday 2012 17:30:00");
				clearInterval(interval); 
			}
		}
		
		//Corremos la funcion
		countdown_proc();
		
		//Hacemos que se ejecute cada segundo
		interval = setInterval(countdown_proc, 1000);
		
	}
}) (jQuery);
