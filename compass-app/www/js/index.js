/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.

    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {

        console.log('Received Event: ' + id);

		this.svghandler();

    },   

	svgsize : 300,
	svgcoord : 200,

	setcoord : function (nam){
	  document.getElementById(nam).style["transform-origin"] = this.svgcoord+"px " + this.svgcoord+"px ";
	},

	north : function (n) {
	  document.getElementById("compass").style.transform = "rotate(" + n + "deg)";
	},

	pitchroll : function (p, r) {
	  document.getElementById("pitchroll").style.transform = "translate(" + p + "px, " + r + "px)";
	},

	svghandler : function (){

		this.svgsize = Math.min( window.innerWidth , window.innerHeight );
		this.svgsize = this.svgsize * 0.70;
		this.svgcoord = this.svgsize / 2;

		document.getElementById("svgcontainer").style.height = this.svgsize + "px";
		document.getElementById("svgcontainer").style.width = this.svgsize + "px";

		this.setcoord("compass");
		this.setcoord("pitchroll");

		watchID = navigator.compass.watchHeading(onSuccess, onError, { frequency: 25 });
		watchGeoId = navigator.geolocation.watchPosition(geolocationSuccess,geolocationError,{timeout: 500 });

	}

};


var watchID ;

function onSuccess(heading) {

    setId('heading', heading.magneticHeading.toFixed(6) );

	app.north( 360 - heading.magneticHeading );

};

function onError(compassError) {
    console.log('Compass error: ' + compassError.code);
	if( compassError === CompassError.COMPASS_NOT_SUPPORTED ){
		setId('heading', "NO COMPASS" );
	}
};



var watchGeoId;

function geolocationSuccess(position) {

	setId('latitude', position.coords.latitude );

	setId('longitude', position.coords.longitude );
	
}

function geolocationError(error) {
	console.log('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}


function setId(id,text){
	try{
		var element = document.getElementById(id);
		element.innerHTML = text ;
	} catch ( e ){

	}
}


app.initialize();



