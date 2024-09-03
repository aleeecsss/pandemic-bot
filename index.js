const Discord = require('discord.js');
const request = require('request');

const config = require('./config.json');
const prefix = config.prefix;
const TOKEN = config.token;

const client = new Discord.Client();

function Judet(id, infectati, decedati, vindecati) {
    this.id = id;
    this.infectati = infectati;
    this.decedati = decedati;
    this.vindecati = vindecati;
}

var p = 0;
var ID = ['Cluj', 'Iasi', 'Brasov', 'Timis', 'Prahova', 'Constanta', 'Ilfov', 'Arges', 'Bihor', 'Sibiu', 'Bacau', 'Suceava', 'Dolj', 'Mures', 'Dambovita', 'Arad', 'Galati', 'Alba', 'Neamt', 'Hunedoara', 'Maramures', 'Valcea', 'Vaslui', 'Olt', 'Buzau', 'Botosani', 'Bistrita-nasaud', 'Braila', 'Satu mare', 'Vrancea', 'Teleorman', 'Salaj', 'Caras-severin', 'Ialomita', 'Harghita', 'Calarasi', 'Giurgiu', 'Gorj', 'Covasna', 'Mehedinti', 'Tulcea'];
var populatie = ['691 000', '758 000', '722 000', '549 000', '762 000', '684 000', '388 000', '591 000', '575 000', '375 000', '616 000', '634 000', '660 000', '550 000', '501 000', '409 000', '536 000', '373 000', '470 000', '396 000', '461 000', '355 000', '395 000', '394 000', '432 000', '412 000', '277 000', '304 000', '329 000', '340 000', '360 000', '224 000', '274 000', '256 000', '284 000', '302 000', '315 000', '266 000', '202 000', '241 000', '201 000'];
var top = [];


var Romania, Bucuresti;

var arr = [];

/**
function getOptimalTime(query) {
    var link = 'https://www.google.com/search?q=';
    var saveHour, minimumCrowd = 1000000;
    for(let i = 0; i < query.length; ++ i) {
        if (query[i] == ' ')
            link += '+';
        else
            link += query[i];
    }
    request(link, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            var str, x, y, n, m;
            for (let i = 0; ;) {
                str = 'hour="';
                x = 0;
                n = html.indexOf(str, i);

                if (n == -1)
                    break;
                else {
                    for (let j = n + str.length; html[j] >= '0' && html[j] <= '9'; ++ j)
                        x = x * 10 + (html[i] - '0');

                    str = 'height:';
                    m = html.indexOf(str, i);
                    y = 0;

                    for (let j = m + str.length; html[j] >= '0' && html[j] <= '9'; ++ j)
                        y = y * 10 + (html[j] - '0');

                    if (minimumCrowd > y) {
                        minimumCrowd = y;
                        saveHour = x;
                    }

                    i = m + 1;
                }
            }
        }
    })
    if (minimumCrowd == 1000000)
        return -1;
    else
        return saveHour;
}
**/

request('https://covid19ro.org/', (error, response, html) => {
    if(!error && response.statusCode == 200) {
        var str = '<td>total infectaţi (inf)<td>';
        var n = html.indexOf(str);
        var infectati = '', decedati = '', vindecati = '';
        for (let i = n + str.length; (html[i] >= '0' && html[i] <= '9') || html[i] == ' '; ++ i)
            infectati += html[i];
        
        str = '<td>decedaţi (dec)<td>';
        n = html.indexOf(str);
        for (let i = n + str.length; (html[i] >= '0' && html[i] <= '9') || html[i] == ' '; ++ i)
            decedati += html[i];
        
        str = '<td>vindecaţi (vin)<td>';
        n = html.indexOf(str);
        for (let i = n + str.length; (html[i] >= '0' && html[i] <= '9') || html[i] == ' '; ++ i)
            vindecati += html[i];

        Romania = new Judet('Romania', infectati, decedati, vindecati);

        infectati = '';
        str = '<td>inf<td>';
        n = html.indexOf(str);
        for (let i = n + str.length; (html[i] >= '0' && html[i] <= '9') || html[i] == ' '; ++ i)
            infectati += html[i];

        Bucuresti = new Judet('Bucuresti', infectati, '', '');

        for (let i = n + 1; p < 41;) {
            infectati = '';
            decedati = '';
            vindecati = '';

            str = '<td>inf<td>';
            var pos = html.indexOf(str, i);

            for (let j = pos + str.length; (html[j] >= '0' && html[j] <= '9') || html[j] == ' '; ++ j)
                infectati += html[j];
            
            str = '<td>dec<td>';
            var pos = html.indexOf(str, i);

            for (let j = pos + str.length; (html[j] >= '0' && html[j] <= '9') || html[j] == ' '; ++ j)
                decedati += html[j];

            str = '<td>vin<td>';
            var pos = html.indexOf(str, i);

            for (let j = pos + str.length; (html[j] >= '0' && html[j] <= '9') || html[j] == ' '; ++ j)
                vindecati += html[j];
            
            var x = new Judet(ID[p], infectati, decedati, vindecati);
            arr.push(x);
            
            ++ p;
            i = pos + 1;
        }
        
        /**
        for (let i = 0; i < 41; ++ i) {
            console.log(arr[i].id);
            console.log(arr[i].infectati);
            console.log(arr[i].decedati);
            console.log(arr[i].vindecati);
        }
        **/
    }
});

const sec = 1000;
var info = 'https://bit.ly/pandemicbot';
const dim = 3;
const fakenews = ['Incalzirea Globala nu exista. https://www.activenews.ro/stiri-mediu/Incalzirea-globala-o-mare-minciuna-Steven-Mosher-om-de-stiinta-%E2%80%9ESchimbarile-climatice-sunt-cea-mai-mare-FRAUDA-stiintifica-savarsita-vreodata-asupra-familiei-omului-.-Cum-se-incearca-obtinerea-controlului-asupra-populatiei-146926', 'Mastile sunt cipate. https://www.smartradio.ro/covid-19-exista-cip-uri-integrate-in-masti-dar-cu-ce-scop/, https://www.youtube.com/watch?v=6davgnmimi8', '5G te spala pe creier. https://www.facebook.com/1499958970260012/posts/2389227991333101/'];
var canal = '768810003762643005', cnt = 0;

setInterval(function() { 
    const channel = client.channels.cache.get(canal);
    channel.send('||@everyone|| Nu uitati sa va spalati pe maini, sa purtati masca daca iesiti din casa si sa evitati spatiile aglomerate! :)');
}, 7200 * sec);

client.once('ready', () => {
    console.log('Ready!');
});

function convertPopToInt(arg) {
    let x = 0;
    for (let i = 0; i < arg.length; ++ i)
        if (arg[i] != ' ')
            x = x * 10 + (arg[i] - '0');
    return x;
};

client.on('message', message => {
    if (message.author.bot)
        return;
    ++ cnt;
    const noAdminEmbed = new Discord.MessageEmbed()
        .setColor('#000000')
        .setDescription('**Nu ai permisiuni de Administrator!**')
    /**
    if (message.content.startsWith(prefix + 'arecovid')) {
        var args = message.content.slice(9).trim();
        var color;
        const t = Math.floor(Math.random() * 101);
        const nuAreCovidEmbed = new Discord.MessageEmbed()
        .setColor('#000000')
        .setTitle('**Eroare**')
        .setDescription('**Nu am primit niciun argument!**')

        if (args.length == 0)
            message.channel.send(nuAreCovidEmbed);
        else {
            if (t <= 33)
                color = '00ff00';
            if (t > 33 && t <= 66)
                color = 'ffff00';
            if (t > 66)
                color = 'ff0000';
            const areCovidEmbed = new Discord.MessageEmbed()
            .setColor(color)
            .setTitle('**Are COVID-19?**')
            .setDescription('** Sansele ca ' + args + ' sa fie infectat(a) sunt de ' + t + '%**')

            message.channel.send(areCovidEmbed);
        }
    }
    **/
    if (message.content.startsWith(prefix + 'changechannel')) {
        if (!message.member.hasPermission('ADMINISTRATOR'))
            message.channel.send(noAdminEmbed);
        else {
            var args = message.content.slice(14).trim();
            var OK = 1;
            for (let i = 0; args[i]; ++ i) {
                if (args[i] < '0' || args[i] > '9') {
                    OK = 0;
                    break;
                }
            }
            if (OK == 1) {
                canal = args;
                message.channel.send('**' + args + ' a fost setat ca un canal de anunturi.**');
            }
            else
                message.channel.send('**Canalul trimis nu este valid.**');
        }
    }
    if (message.content == prefix + 'help') {
        /**
        message.channel.send('Comenzi disponibile:');
        message.channel.send('+help - ajutor');
        message.channel.send('+feedback - pentru feedback');
        message.channel.send('+info - site-ul oficial al PANDEMIC-BOT-ului');
        message.channel.send('+fakenews - fake news');
        message.channel.send('+covid NUME_JUDET - informatii despre COVID-19 in NUME_JUDET');
        message.channel.send('+covid - informatii despre COVID-19 in Romania');
        message.channel.send('+vacanta - unde ar trebui sa-ti petreci vacanta in aceasta perioada dificila');
        message.channel.send('+timp LOC - timpul in care aglomeratia e minima in LOC');
        message.channel.send('+changechannel ID_CANAL - setare canal de anunturi');
        **/
        const helpEmbed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('**Help**')
        .setDescription('**+help** - ajutor\n\n**+info** - site-ul oficial al PANDEMIC-BOT-ului\n\n**+covid** - informatii despre COVID-19 in Romania\n\n**+covid NUME_JUDET** - informatii despre COVID-19 in JUDET\n\n**+feedback** - pentru feedback\n\n**+vacanta** - unde ar trebui sa-ti petreci vacanta in aceasta perioada dificila\n\n**+changechannel ID_CANAL** - setare canal de anunturi')
        .setThumbnail('https://inthealthclinic.com/wp-content/uploads/2020/06/597px-SARS-CoV-2_without_background.png')
        message.channel.send(helpEmbed);
    }
    if (message.content == prefix + 'shutdown') {
        if(!message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.send(noAdminEmbed);
        }
        else
            client.destroy();
    }
    if (message.content == prefix + 'info') {
        const infoEmbed = new Discord.MessageEmbed()
        .setColor('#00ff00')
        .setTitle('**Informatii**')
        .setDescription('**' + info + '**')

        message.channel.send(infoEmbed);
    }
    /**
    if (message.content == prefix + 'fakenews') {
        let p = Math.floor(Math.random() * dim);
        const fakenewsEmbed = new Discord.MessageEmbed()
        .setColor('#00ff00')
        .setTitle('**Fake News**')
        .setDescription('**' + fakenews[p] + '**')

        message.channel.send(fakenewsEmbed);
    }
    **/
    if (message.content == prefix + 'covid') {
        const RomaniaEmbed = new Discord.MessageEmbed()
        .setColor('#808080')
        .setTitle('**Informatii COVID-19 Romania**')
        .setThumbnail('https://inthealthclinic.com/wp-content/uploads/2020/06/597px-SARS-CoV-2_without_background.png')
        .setDescription('**In ' + Romania.id + ' exista:\n * ' + Romania.infectati + ' infectati de COVID-19\n * ' + Romania.decedati + ' decedati de COVID-19\n * ' + Romania.vindecati + ' vindecati de COVID-19**')
        
        message.channel.send(RomaniaEmbed);
    }
    if (message.content.startsWith(prefix + 'covid ')) {
        var args = message.content.slice(7);
        var command = '';
        if (args[0] >= 'a')
            command += args[0].toUpperCase();
        else
            command += args[0];
        for (let i = 1; i < args.length; ++ i) {
            if (args[i] <= 'Z' && args[i] != '-')
                command += args[i].toLowerCase();
            else
                command += args[i];
        }
        if (command == 'Bucuresti') {
            const BucurestiEmbed = new Discord.MessageEmbed()
            .setColor('#808080')
            .setTitle('**Informatii COVID-19 Bucuresti**')
            .setThumbnail('https://inthealthclinic.com/wp-content/uploads/2020/06/597px-SARS-CoV-2_without_background.png')
            .setDescription('**In ' + Bucuresti.id + ' exista:\n * ' + Bucuresti.infectati + ' infectati de COVID-19**')

            message.channel.send(BucurestiEmbed);
        }
        else {
            var OK = 0;
            for (let i = 0; i < 41; ++ i) {
                if (command == arr[i].id) {
                    var col;
                    if ((convertPopToInt(arr[i].infectati) - convertPopToInt(arr[i].decedati) - convertPopToInt(arr[i].vindecati)) / populatie[i] >= 3)
                        col = '#ff0000';
                    else
                        if ((convertPopToInt(arr[i].infectati) - convertPopToInt(arr[i].decedati) - convertPopToInt(arr[i].vindecati)) / populatie[i] >= 1.5)
                            col = '#ffff00';
                        else
                            col = '#00ff00';
                    const JudetEmbed = new Discord.MessageEmbed()
                    .setColor(col)
                    .setTitle('**Informatii COVID-19 ' + ID[i] + '**')
                    .setThumbnail('https://inthealthclinic.com/wp-content/uploads/2020/06/597px-SARS-CoV-2_without_background.png')
                    .setDescription('**In ' + arr[i].id + ' exista:\n * ' + arr[i].infectati + ' infectati de COVID-19\n * ' + arr[i].decedati + ' decedati de COVID-19\n * ' + arr[i].vindecati + ' vindecati de COVID-19**')
                    
                    message.channel.send(JudetEmbed);
                    OK = 1;
                    break;
                }
            }
            if (OK == 0) {
                const noJudetEmbed = new Discord.MessageEmbed()
                .setColor('#000000')
                .setDescription('**Nu exista judetul ' + command + '!**')

                message.channel.send(noJudetEmbed);
            }
        }
    }
    if (message.content == prefix + 'vacanta') {
        // message.channel.send('Topul judetelor cu cea mai mica rata de infectare:');
        var selected = [];
        for (let i = 0; i < 41; ++ i)
            selected.push(false);
        for (let k = 0; k < 5; ++ k) {
            let a = 1000, b = 1, position = 0;
            for (let i = 0; i < 41; ++ i) {
                if (selected[i] == false) {
                    let p = convertPopToInt(arr[i].infectati) - convertPopToInt(arr[i].decedati) - convertPopToInt(arr[i].vindecati), q = convertPopToInt(populatie[i]);
                    if (a * q > b * p) {
                        a = p;
                        b = q;
                        position = i;
                    }
                }
            }
            selected[position] = true;
            top.push(ID[position]);
        }

        const vacantaEmbed = new Discord.MessageEmbed()
        .setColor('#00ff00')
        .setTitle('**Judetele cu cea mai mica rata de infectare**')
        .setThumbnail('https://inthealthclinic.com/wp-content/uploads/2020/06/597px-SARS-CoV-2_without_background.png')
        .setDescription('**1. ' + top[0] + '\n\n2. ' + top[1] + '\n\n3. ' + top[2] + '\n\n4. ' + top[3] + '\n\n5. ' + top[4] + '**')

        message.channel.send(vacantaEmbed);

        // Determinare top 5;

        // Momentan, top 5-ul este: Gorj, Harghita, Bistrita-Nasaud, Suceava si Buzau;

        // Se vor efectua update-uri in viitorul apropiat;

        /**
        for (let k = 0; k < 5; ++ k)
            message.channel.send((k + 1) + '. ' + top[k]);
        **/

        /**
        const GorjEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Coloana Infinitului (Gorj)')
        .setDescription('Coloana Infinitului sau Coloana fără sfârșit este o sculptură a artistului român Constantin Brâncuși, parte a trilogiei Ansamblului Monumental din Târgu Jiu, compus din Coloana Infinită, Poarta sărutului și Masa tăcerii concepute și executate de acesta. Inaugurată la 27 octombrie 1938, coloana are o înălțime de 29,35 metri și este compusă din 16 module octaedrice suprapuse, respectiv având la extremitățile inferioară și superioară câte o jumătate de modul. Sculptura este o stilizare a coloanelor funerare specifice sudului României. Denumirea originală era „Coloana recunoștinței fără sfârșit”[necesită citare] și a fost dedicată soldaților români din Primul Război Mondial căzuți în 1916 în luptele de pe malul Jiului.')
        .setImage('https://cdn.discordapp.com/attachments/768804114062639107/784521096187478036/coloana-infinitului.png')
        message.channel.send(GorjEmbed);

        const HarghitaEmbed = new Discord.MessageEmbed()
        .setColor('#00aadd')
        .setTitle('Lacul Rosu (Harghita)')
        .setDescription('Lacul Roșu (local cunoscut și sub numele de Lacul Ghilcoș) este un lac de baraj natural format în urma prăbușirii unui versant din cauza cutremurului din 23 ianuarie 1838, ora 18,45. 6,9 magnitudine, VIII intensitate, la poalele Muntelui Hășmașul Mare, în apropierea Cheilor Bicazului, la distanța de 26 km de Gheorgheni, în județul Harghita. La ultimele măsurători, efectuate în anul 1987, dimensiunile acestuia sunt: lacul se întinde pe un perimetru de 2.830 m, aria este de 114.676 m² și volumul apei care se acumulează este de 587.503 m³. Lacul s-a format la altitudinea de 983 m, într-o depresiune cu un climat predominant subalpin.')
        .setImage('https://cdn.discordapp.com/attachments/784160388173660160/784534506924933151/lacu-rosu-red-lake.jpg')
        message.channel.send(HarghitaEmbed);

        const BistritaNasaudEmbed = new Discord.MessageEmbed()
        .setColor('#000022')
        .setTitle('Biserica Evanghelică din Bistrița (Bistrita-Nasaud)')
        .setDescription('Biserica Evanghelică, aflată în centrul orașului Bistrița, este un monument de arhitectură reprezentativ pentru tranziția de la stilul gotic la cel al Renașterii în Transilvania. Turnul bisericii, cu o înălțime de 75 m, este cel mai înalt turn medieval din România, fiind cu puțin mai înalt decât turnul Catedralei Evanghelice din Sibiu.')
        .setImage('https://cdn.discordapp.com/attachments/768804114062639107/784520927257559080/Dumitra-Biserica-fost-Evanghelica-05.png')
        message.channel.send(BistritaNasaudEmbed);

        const SuceavaEmbed = new Discord.MessageEmbed()
        .setColor('#22ff33')
        .setTitle('Mănăstirea Voroneț (Suceava)')
        .setDescription('Mănăstirea Voroneț, supranumită „Capela Sixtină a Estului”, este un complex monahal medieval construit în satul Voroneț, astăzi localitate componentă a orașului Gura Humorului. Mănăstirea se află la 36 km de municipiul Suceava și la numai 4 km de centrul orașului Gura Humorului. Ea constituie una dintre cele mai valoroase ctitorii ale lui Ștefan cel Mare (1457-1504). Biserica a fost ridicată în anul 1488 în numai 3 luni și 3 săptămâni, ceea ce constituie un record pentru acea vreme.')
        .setImage('https://cdn.discordapp.com/attachments/768804114062639107/784517798717947904/Manastirea-Voronet-936x936.png')
        message.channel.send(SuceavaEmbed);

        const BuzauEmbed = new Discord.MessageEmbed()
        .setColor('#22ff33')
        .setTitle('Vulcanii Noroioși de la Pâclele Mici (Buzau)')
        .setDescription('Vulcanii Noroioși de la Pâclele Mici este o arie protejată de interes național ce corespunde categoriei a IV-a IUCN (rezervație naturală, tip botanic și geologic) aflată pe raza comunei Berca din județul Buzău. Pâclele Mici se află la o altitudine de 341 m și au o suprafață de 16,5 ha.')
        .setImage('https://cdn.discordapp.com/attachments/768804114062639107/784523379146883112/vulcanii-noroiosi-buzau_34608781-1024x683.png')
        message.channel.send(BuzauEmbed);
        **/
    }
    /**
    if (message.content.startsWith(prefix + 'timp')) {
        var args = message.content.slice(6).trim();
        var ans = getOptimalTime(args);
        if (ans == -1)
            message.channel.send('Nu am gasit informatii despre ' + args + '!' + ' Incearca sa dai mai multe detalii!');
        else
            message.channel.send('Ora optima de a te duce la ' + args + ' este: ' + ans);
    }
    **/
    if (message.content == prefix + 'feedback') {
        const feedbackEmbed = new Discord.MessageEmbed()
        .setColor('#000000')
        .setTitle('**Feedback**')
        .setDescription('**https://forms.gle/LAweR9XZHbHESdZW9**')

        message.channel.send(feedbackEmbed);
    }
    if (cnt % 200 == 0) {
        const donatieEmbed = new Discord.MessageEmbed()
        .setColor('#000000')
        .setTitle('**Donatii**')
        .setDescription('**Nu uitati sa donati! Avem promisiuni mari! : https://sites.google.com/view/pandemicbot/doneaza?authuser=0**')

        message.channel.send(donatieEmbed);
    }
});

client.login(TOKEN);
