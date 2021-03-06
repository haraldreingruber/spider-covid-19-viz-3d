// copyright 2020 Spider contributors. MIT license.
// 2020-03-20
/* globals NCDdivNewCasesDate, selCountry, divStats, divChartMmg */
// jshint esversion: 6
// jshint loopfunc: true


const NCD = {};



NCD.init = function () {

	const urlCORS = 'https://cors-anywhere.herokuapp.com/';
	const url = `https://covid-api.mmediagroup.fr/v1/history?status=Confirmed`;

	NCD.requestFile( urlCORS + url, NCD.onLoadMMG );

	// NCDdivNewCasesDate.innerHTML = `
	// <details id=detNCD hidden>
	// <summary><b>New cases by date</b> Most recent at top</summary>
	// <div id=NCDdivStats ></div>

	// <div id=NCDdivChartMmg style="border: 0px red solid; height: 30ch; overflow: auto; resize: both;" ></div>

	// <div><small>
	// 	Data credit: <a href="https://mmediagroup.fr" target="_blank">https://mmediagroup.fr</a>
	// </small></div>
	// </details>
	// `;

	// detNCD.open = window.innerWidth > 640;

};



NCD.requestFile = function ( url, callback ) {

	const xhr = new XMLHttpRequest();
	xhr.open( 'GET', url, true );
	xhr.onerror = ( xhr ) => console.log( 'error:', xhr );
	//xhr.onprogress = ( xhr ) => console.log( 'bytes loaded', xhr.loaded, xhr.target.status  );
	xhr.onload = callback;
	xhr.send( null );

};



NCD.onLoadMMG = function ( xhr ) {

	NCD.json = JSON.parse( xhr.target.response );
	//console.log( "json", NCD.json );

	NCD.getCountries();

	//NCD.getDates();

};



NCD.getCountries = function () {

	const countries = Object.entries( NCD.json );
	//console.log( 'entries', entries );

	const places = [];

	countries.forEach( country => {

		const locations = Object.entries( country[ 1 ] );

		if ( locations.length === 1 ) {

			places.push( country[ 0 ] );

		} else {

			//const arr = locations.slice( 1 ).map( arr => arr[ 0 ] );
			places.push( country[ 0 ] );

			arr = Object.keys( country[ 1 ] ).slice( 1 );

			//console.log( 'country', arr );

			places.push( ...arr );
		}

	} );

	places.sort();

};



NCD.getDates = function ( country = "France", place = "France" ) {

	if ( !NCD.json ) {

		return "It may take a while to load all the data. Keep trying every ten seconds or so.";

	} else if ( NCD.json.message ) {

		return `<p><mark>${ NCD.json.message }</mark></p><p>Try again later</p>`;

	}
	//console.log( 'c/p', country, place );

	const countryData = NCD.json[ country ];
	//console.log( 'countryData', countryData );

	const placeData = countryData[ place ];
	//console.log( 'placeData', placeData );

	if ( !countryData ) { return "no case data"; }

	if ( Array.isArray( countryData.All ) === false ) {

		const dates = placeData ? placeData.dates : countryData.All.dates;
		locate = placeData ? placeData : countryData.All;

		NCD.dates = locate.dates;
		//console.log( 'dates', dates );

		const cases = Object.entries( NCD.dates ).map( item => item[ 1 ] );
		//console.log( 'cases', cases );

		let casesNew = cases.slice( 0, -1 );

		casesNew = casesNew.map( ( item, index ) => Math.abs( item - cases[ index + 1 ] ) );
		//console.log( 'casesNew', casesNew );

		NCD.drawChart( casesNew );

	}

	// population: ${ stats.population.toLocaleString() }

	const stats = locate;

	const totals = `${ place } ${ country } totals:
	confirmed: ${ stats.confirmed.toLocaleString() }
	recovered: ${ stats.recovered.toLocaleString() }
	deaths: ${ stats.deaths.toLocaleString() }
	`;

	return totals;

};



NCD.drawChart = function ( arr ) {

	const max = Math.max( ...arr );
	//console.log( 'max', max );

	const scale = 200 / max;

	const dateStrings = Object.keys( NCD.dates );

	const bars = arr.map( ( item, index ) =>

		`<div style="background-color: cyan; color: black; margin-top:1px; height:0.5ch; width:${ scale * item }px;"
		title="date: ${ dateStrings[ index ] } new cases : ${ item.toLocaleString() }">&nbsp;</div>` ).join( "" );

	//NCDdivChartMmg.innerHTML = bars;

	NCD.bars = `<div style=background-color:#ddd title="New cases per day. The curve you hope to see flatten!" >${ bars }</div>`;

};


