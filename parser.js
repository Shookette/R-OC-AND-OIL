
var ocAdjectives = ["argues",
	"an",
	"aq",
	"alde",
	"abal",
	"iaga",
	"oz",
	"oza",
	"os",
	"aspe",
	"puy",
	"ac",
	"cast",
	"cas",
	"cazien",
	"caz",
	"bord",
	"stier",
	"kar",
	"gar",
	"cauna",
	"lat",
	"cost",
	"roqu",
	"penn",
	"baux",
	"bouc",
	"aigues"];

var oilAdjectives = ["court",
	"ay",
	"é",
	"ey",
	"y",
	"ez",
	"ies",
	"heim",
	"hem",
	"ham",
	"ghem",
	"ach",
	"ich",
	"ig",
	"ange",
	"anges",
	"ingues",
	"in",
	"ines",
	"ingue",
	"angen",
	"ang",
	"ans",
	"ens",
	"eins",
	"eins",
	"iac",
	"ker",
	"trev",
	"treb",
	"treg",
	"lann",
	"land",
	"loc",
	"plou",
	"igny",
	"illy",
	"ville",
	"court",
	"viller",
	"willer",
	"villers",
	"villiers"];

var averageByDepartment = [];
var reader = new FileReader();

		function findOcAndOil(that){

			if(that.files && that.files[0]){
				var reader = new FileReader();
				reader.onload = function (e) {
					var output=e.target.result;
					var data = CSVToArray(output, ";");
					parser(data);
				};//end onload()
				reader.readAsText(that.files[0]);
			}
		}

		function parser(data) {
			var departments = [];
			for(var commune in data) {

				var nomCommune = data[commune][1];
				var codePostal = data[commune][2];
				var found = false;
				if(typeof nomCommune != 'undefined') {

					var department = codePostal.substr(0, 2);
					if(!departments.hasOwnProperty(department)){
						departments[department] = [];
						departments[department]['oc'] = 0;
						departments[department]['oil'] = 0;
						departments[department]['neutre'] = 0;
					}
					for(var adj in oilAdjectives){
						var reg = new RegExp("("+oilAdjectives[adj].toUpperCase()+'$)');
						//console.log(reg);
						if(nomCommune.match(reg) != null) {
							departments[department]['oil']++;
							found = true;
							break;
						}
					}
					if(!found) {
						for(var adj in ocAdjectives){
							//var reg = new RegExp('('+ocAdjectives[adj]+')');
							if(nomCommune.indexOf(ocAdjectives[adj].toUpperCase()) != -1) {
								departments[department]['oc']++;
								found = true;
								break;
							}
						}
					}
					if(!found) {
						departments[department]['neutre']++;
					}
				}

			}
			averagingByDepartment(departments);
		}

		function averagingByDepartment(data) {
			for(var department in data) {
				var mean = (data[department]['oc'] - data[department]['oil']) / (data[department]['oc'] + data[department]['oil'] + data[department]['neutre']);
				averageByDepartment[department] = mean;
			}
			console.log(averageByDepartment);
		}






	// ref: http://stackoverflow.com/a/1293163/2343
		// This will parse a delimited string into an array of
		// arrays. The default delimiter is the comma, but this
		// can be overriden in the second argument.
		function CSVToArray( strData, strDelimiter ){
			// Check to see if the delimiter is defined. If not,
			// then default to comma.
			strDelimiter = (strDelimiter || ",");

			// Create a regular expression to parse the CSV values.
			var objPattern = new RegExp(
				(
					// Delimiters.
					"(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

					// Quoted fields.
					"(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

					// Standard fields.
					"([^\"\\" + strDelimiter + "\\r\\n]*))"
				),
				"gi"
				);


			// Create an array to hold our data. Give the array
			// a default empty first row.
			var arrData = [[]];

			// Create an array to hold our individual pattern
			// matching groups.
			var arrMatches = null;


			// Keep looping over the regular expression matches
			// until we can no longer find a match.
			while (arrMatches = objPattern.exec( strData )){

				// Get the delimiter that was found.
				var strMatchedDelimiter = arrMatches[ 1 ];

				// Check to see if the given delimiter has a length
				// (is not the start of string) and if it matches
				// field delimiter. If id does not, then we know
				// that this delimiter is a row delimiter.
				if (
					strMatchedDelimiter.length &&
					strMatchedDelimiter !== strDelimiter
					){

					// Since we have reached a new row of data,
					// add an empty row to our data array.
					arrData.push( [] );

				}

				var strMatchedValue;

				// Now that we have our delimiter out of the way,
				// let's check to see which kind of value we
				// captured (quoted or unquoted).
				if (arrMatches[ 2 ]){

					// We found a quoted value. When we capture
					// this value, unescape any double quotes.
					strMatchedValue = arrMatches[ 2 ].replace(
						new RegExp( "\"\"", "g" ),
						"\""
						);

				} else {

					// We found a non-quoted value.
					strMatchedValue = arrMatches[ 3 ];

				}


				// Now that we have our value string, let's add
				// it to the data array.
				arrData[ arrData.length - 1 ].push( strMatchedValue );
			}

			// Return the parsed data.
			return( arrData );
		}
