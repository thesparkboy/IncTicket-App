//logos can be displayed in front of the team name by creating a key-map pair of image url and team-name.

//array of teams and its respective country.
var teams = ['Arsenal','Astana','Atletico','Barcelona','BATE','Bayern','Benfica','Chelsea','CSKA Moskva','Dinamo Zagreb','Dynamo Kyiv','Galatasaray','Gent','Juventus','Leverkusen','Lyon','M. Tel-Aviv','Malmo','Man. City','Man. United','Monchengladbach','Olympiacos','Paris','Porto','PSV','Real Madrid','Roma','Sevilla','Shakhtar Donetsk','Valencia','Wolfsburg','Zenit'];
var country = ['ENG','KAZ','ESP','ESP','BLR','GER','POR','ENG','RUS','CRO','UKR','TUR','BEL','ITA','GER','FRA','ISR','SWE','ENG','ENG','GER','GRE','FRA','POR','NED','ESP','ITA','ESP','UKR','ESP','GER','RUS'];
//if the team is domestic league champion,index is stored with 1 else 0.
var isChampion = [0,0,0,1,0,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1];
var isChampionIndex = [3,5,6,7,13,22,24,31];
//index of league champion teams
var teamsObject = [];
var championCountry = [];
//object array of league champion teams
for (var i = 0; i < 32; i++) {
    teamsObject.push({
        name: teams[i],
        country: country[i],
        isChampion: isChampion[i]
    });
}
var length = 8;
var num = 24;
//Random Display of domestic league champion teams in the top of the groups.
for(i = 0;i<8;i++){
	var x = Math.floor(Math.random() * length);
	document.getElementById(i*4+1+"").textContent = teams[isChampionIndex[x]];
	championCountry.push(teamsObject[isChampionIndex[x]].country);
	isChampionIndex.splice(x,1);
	length--;
}
//Teams that are not domestic league champion are stored in the leftTeam array.
var leftTeams = [];
for(var i = 0;i < 32;i++){
	if(teamsObject[i].isChampion !== 1){
		leftTeams.push(teamsObject[i]);
	}
}
var bool = true;
//Random display of the other teams in the groups while satisfying the given condition
// i.e. Teams with same country as domestic league champion should not be displayed in the same group etc. 
while(bool){
	var copyLeftTeams = leftTeams.slice();
	length = 24;
	var j = 0;
	var check = 0;
	var x;
	//index is the position of the element to display on the page by DOM.
	var index = 2;
	for (var i = 0; i < 24; i++) {
		if(i != 0 && i % 3 == 0){
			j++;
		}
		x = Math.floor(Math.random() * length);
		//Loop untile the given team is not from the same country as the domestic league championCountry.
		while(championCountry[j] === copyLeftTeams[x].country){
			var count = 0;
			for(var t = 0;t < copyLeftTeams.length ; t++){
				if(championCountry[j] === copyLeftTeams[t].country){
					count++;
				}
			}
			//if the reamining teams are all from the same country as the domestic league champion,then generate a new list.
			if(count == copyLeftTeams.length){
				check = 1;
				break;
			}
			var x = Math.floor(Math.random() * length);
		}
		if(check == 1){
			break;
		}
		document.getElementById(index+"").innerHTML = copyLeftTeams[x].name;
		//removing the selected team from the array.	
		copyLeftTeams.splice(x,1);
		//if index is divisible by 4,increment it by 2 otherwise it will occupy the domestic league champion position.
		if(index % 4 == 0){
			index += 2;
		}else{
			index++;
		}
		length--;
		//if the length becomes 0,we can say that our work is done,list is generated.
		if(length == 0){
			bool = false;
		}
	}
}
