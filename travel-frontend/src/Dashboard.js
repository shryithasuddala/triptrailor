// Create a trip planning form with the following inputs:

// - Destination (dropdown with Indian states and districts)
// - Budget (Low, Medium, High)
// - Travel Style (Fast, Balanced, Relaxed)
// - Duration (number of days)
// - Interests (Nature, Temples, Adventure, Food, Shopping)

// Features:
// - Generate button
// - Input validation
// - Loading animation while generating plan

// Output:
// - Generate 3 travel plans: Fast, Balanced, Relaxed

import React, { useState } from "react";
import Navbar from "./Navbar";
import "./App.css";

const telanganaDistrictData = {
    Adilabad: [
  "Kuntala Waterfalls",
  "Pochera Waterfalls",
  "Gayatri Waterfalls",
  "Kanakai Waterfalls",
  "Kawal Wildlife Sanctuary",
  "Pranahita Wildlife Sanctuary",
  "Jainath Temple",
  "Nagoba Temple",
  "Basar Saraswati Temple",
  "Kadam Dam",
  "Satnala Dam",
  "Trishul Pahad",
  "Indravelli",
  "Utnoor",
  "Kerameri Hills"
],

"Bhadradri Kothagudem": [
  "Bhadrachalam Temple",
  "Godavari River View Point",
  "Parnasala",
  "Sabari River Confluence Point",
  "Papi Kondalu (Nearby)",
  "Kinnerasani Dam",
  "Kinnerasani Wildlife Sanctuary",
  "Paloncha Lake",
  "Bhadradri Thermal Power Station View Point",
  "Gundala Waterfalls",
  "Kothagudem Mines View Area",
  "Singareni Collieries Museum",
  "Yellandu Coal Mines Area",
  "Tekulapalli Forest Area",
  "Sujathanagar Hills",
  "Charla Forest Zone",
  "Dummugudem Barrage",
  "Jattayu Forest Area",
  "Maredumilli Border Forest Trails",
  "Gannavaram River Banks",
  "Ashwaraopeta Hills",
  "Manuguru River View Point",
  "Manuguru Forest Range",
  "Burgampahad Temple Area",
  "Bhadrachalam Bridge View Point",
  "Temple Ghat Road",
  "Kinnerasani Reservoir Backwaters",
  "Palvancha Town Center"],

Hyderabad: [
  "Charminar",
  "Golconda Fort",
  "Ramoji Film City",
  "Salar Jung Museum",
  "Birla Mandir",
  "Chowmahalla Palace",
  "Hussain Sagar",
  "Nehru Zoological Park",
  "KBR National Park",
  "Shilparamam",
  "Snow World",
  "Lumbini Park",
  "Tank Bund",
  "Birla Science Museum",
  "Sudha Cars Museum",
  "Mecca Masjid",
  "Taramati Baradari",
  "Qutb Shahi Tombs",
  "Durgam Cheruvu",
  "Cable Bridge Hyderabad",
  "Inorbit Mall",
  "GVK One Mall",
  "Forum Sujana Mall",
  "NTR Gardens",
  "Jalavihar Water Park",
  "Mount Opera Theme Park",
  "Osman Sagar (Gandipet)",
  "Himayat Sagar",
  "Keesaragutta Temple",
  "Sanghi Temple",
  "Chilkur Balaji Temple",
  "Ananthagiri Hills",
  "Mrugavani National Park",
  "Paigah Tombs",
  "Falaknuma Palace"
],

Jagtial: [
  "Dharmapuri Temple",
  "Sri Lakshmi Narasimha Swamy Temple",
  "Kondagattu Temple",
  "Lower Manair Dam",
  "Jagtial Fort",
  "Polasa Falls",
  "Dharmapuri River Ghat",
  "Kondagattu Hills",
  "Jagityal Clock Tower",
  "Local Step Wells",
  "Karimnagar Nearby Lakes",
  "Manair River",
  "Village Temples",
  "Agricultural Fields View",
  "Temple Hill Viewpoints"
],

Jangaon: [
  "Kolanu Pakka Jain Temple",
  "Pembarthi Village",
  "Pembarthi Metal Craft",
  "Raghunath Temple",
  "Bhongir Fort",
  "Aler Temple",
  "Local Lakes",
  "Temple Clusters",
  "Village Craft Centers",
  "Heritage Streets",
  "Small Hills",
  "Rural Tourism Spots",
  "Local Markets",
  "Nearby Forest Patches",
  "Cultural Sites"
],

"Jayashankar Bhupalpally": [
  "Eturnagaram Wildlife Sanctuary",
  "Laknavaram Lake",
  "Bogatha Waterfalls",
  "Medaram Sammakka Saralamma Temple",
  "Tadvai Forest",
  "Mallur Temple",
  "Kaleshwaram Temple",
  "Godavari River Banks",
  "Forest Viewpoints",
  "Tribal Villages",
  "River Streams",
  "Eco Tourism Zones",
  "Forest Trek Routes",
  "Local Waterfalls",
  "Hill Viewpoints"
],

"Jogulamba Gadwal": [
  "Jogulamba Temple",
  "Alampur Temples",
  "Navabrahma Temples",
  "Sangameshwara Temple",
  "Tungabhadra River",
  "Krishna River",
  "Beechupally Temple",
  "River Viewpoints",
  "Temple Corridors",
  "Historic Temple Sites",
  "Village Temples",
  "Local Markets",
  "Gadwal Fort",
  "Handloom Areas",
  "Cultural Streets"
],

Kamareddy: [
  "Domakonda Fort",
  "Pocharam Wildlife Sanctuary",
  "Pocharam Dam",
  "Lingampet Forest",
  "Kamareddy Lake",
  "Local Temples",
  "Village Reservoirs",
  "Forest Viewpoints",
  "Agriculture Fields",
  "Hill Areas",
  "Nearby Nizamabad Spots",
  "Local Parks",
  "Temple Clusters",
  "Small Water Bodies",
  "Rural Tourism Areas"
],

Karimnagar: [
  "Elgandal Fort",
  "Lower Manair Dam",
  "Ujwala Park",
  "Nagunur Temples",
  "Manair River Front",
  "Kothapalli Reservoir",
  "Karimnagar Deer Park",
  "Cable Bridge Karimnagar",
  "River Viewpoints",
  "Temple Clusters",
  "Local Lakes",
  "Historical Structures",
  "Parks",
  "Village Tourism Spots",
  "Nearby Hills"
],

Khammam: [
  "Khammam Fort",
  "Nelakondapalli",
  "Palair Lake",
  "Perantalapalli",
  "Kusumanchi Temple",
  "Wyra Reservoir",
  "Munneru River",
  "Local Waterfalls",
  "Temple Clusters",
  "Forest Areas",
  "Village Tourism",
  "Hill Viewpoints",
  "Local Parks",
  "Nearby Tribal Areas",
  "Reservoir Viewpoints"
],

"Komaram Bheem": [
  "Kerameri Hills",
  "Asifabad Forest",
  "Sirpur Kagaznagar",
  "Kumaram Bheem Memorial",
  "Jodeghat",
  "Forest Trek Routes",
  "River Streams",
  "Local Waterfalls",
  "Tribal Villages",
  "Hill Viewpoints",
  "Forest Checkposts",
  "Village Temples",
  "Nearby Wildlife Areas",
  "Nature Trails",
  "Eco Tourism Spots"
],

Mahabubabad: [
  "Kuravi Veerabhadra Temple",
  "Bayyaram Forest",
  "Pakhal Lake",
  "Gangaram Lake",
  "Local Waterfalls",
  "Temple Hills",
  "Forest Trails",
  "Village Tourism",
  "Agriculture Fields",
  "Local Lakes",
  "Nearby Warangal Spots",
  "Temple Clusters",
  "Hill Viewpoints",
  "Eco Tourism Areas",
  "Forest Checkpoints"
],

Mahabubnagar: [
  "Pillalamarri Banyan Tree",
  "Koilkonda Fort",
  "Jurala Dam",
  "Mallela Theertham",
  "Koilsagar Dam",
  "Krishna River",
  "Beechupally Temple",
  "Forest Areas",
  "Temple Clusters",
  "Hill Viewpoints",
  "Local Lakes",
  "Village Tourism",
  "Reservoir Areas",
  "Nearby Srisailam Routes",
  "Nature Spots"
],

Mancherial: [
  "Pranahita River",
  "Shivaram Wildlife Sanctuary",
  "Gandhari Fort",
  "Luxettipet Forest",
  "Godavari River",
  "River Viewpoints",
  "Forest Trails",
  "Village Tourism",
  "Temple Clusters",
  "Local Lakes",
  "Eco Tourism Areas",
  "Nearby Adilabad Spots",
  "Hill Areas",
  "Nature Walk Zones",
  "Wildlife Areas"
],

Medak: [
  "Medak Church",
  "Medak Fort",
  "Pocharam Dam",
  "Edupayala Temple",
  "Manjeera River",
  "Singur Dam",
  "Forest Areas",
  "Temple Clusters",
  "Village Tourism",
  "Hill Viewpoints",
  "Local Lakes",
  "Historical Sites",
  "Parks",
  "Reservoir Views",
  "Nearby Sangareddy Spots"
],

"Medchal-Malkajgiri": [
  "Shamirpet Lake",
  "Deer Park",
  "Hakimpet Lake",
  "Kompally Area",
  "Genome Valley",
  "Local Parks",
  "Temple Clusters",
  "Resort Areas",
  "Nearby Lakes",
  "Urban Parks",
  "Hill Areas",
  "Village Spots",
  "Recreation Areas",
  "Local Markets",
  "Water Bodies"
],

Mulugu: [
  "Ramappa Temple",
  "Ramappa Lake",
  "Laknavaram Lake",
  "Bogatha Waterfalls",
  "Eturnagaram Wildlife Sanctuary",
  "Tadvai Forest",
  "Medaram Temple",
  "Forest Trails",
  "River Streams",
  "Hill Viewpoints",
  "Tribal Villages",
  "Nature Camps",
  "Eco Tourism Spots",
  "Local Waterfalls",
  "Forest Checkposts"
],

Nagarkurnool: [
  "Srisailam Dam",
  "Mallela Theertham",
  "Amrabad Tiger Reserve",
  "Farahabad View Point",
  "Domalpenta Forest",
  "Krishna River",
  "Forest Trails",
  "Temple Areas",
  "Hill Viewpoints",
  "Eco Tourism Zones",
  "Wildlife Areas",
  "Nature Camps",
  "Local Waterfalls",
  "Forest Roads",
  "Reservoir Views"
],

Narayanpet: [
  "Koilkonda Fort",
  "Narayanpet Handloom",
  "Krishna River",
  "Temple Clusters",
  "Village Tourism",
  "Agriculture Fields",
  "Hill Areas",
  "Local Lakes",
  "Nearby Mahabubnagar Spots",
  "Cultural Areas",
  "Traditional Villages",
  "Temple Hills",
  "Rural Tourism",
  "Local Markets",
  "Nature Spots"
],

Nalgonda: [
  "Nagarjuna Sagar Dam",
  "Ethipothala Waterfalls",
  "Nagarjunakonda",
  "Buddhist Museum",
  "Devarakonda Fort",
  "Kolanu Pakka Jain Temple",
  "Chaya Someswara Temple",
  "Mattapalli Temple",
  "Dindi Reservoir",
  "Panagal Temples",
  "Musi River",
  "Hill Viewpoints",
  "Temple Clusters",
  "Village Tourism",
  "Reservoir Areas"
],

Nirmal: [
  "Nirmal Fort",
  "Basar Saraswati Temple",
  "Kadile Papahareshwar Temple",
  "Nirmal Toys Village",
  "Godavari River",
  "Forest Areas",
  "Temple Clusters",
  "Local Lakes",
  "Hill Areas",
  "Village Tourism",
  "Nearby Adilabad Spots",
  "Nature Trails",
  "Water Streams",
  "Cultural Areas",
  "Eco Tourism Spots"
],

Nizamabad: [
  "Dichpally Ramalayam",
  "Alisagar Reservoir",
  "Nizamabad Fort",
  "Sarangapur Temple",
  "Pocharam Dam",
  "Nizamsagar Dam",
  "Godavari Basin",
  "Temple Clusters",
  "Local Lakes",
  "Village Tourism",
  "Hill Areas",
  "Parks",
  "Nearby Kamareddy Spots",
  "Reservoir Views",
  "Nature Spots"
],

Peddapalli: [
  "Ramagundam Dam",
  "Godavari River",
  "NTPC Township",
  "Ramagundam Bridge",
  "River Viewpoints",
  "Temple Clusters",
  "Local Lakes",
  "Village Tourism",
  "Nearby Karimnagar Spots",
  "Hill Areas",
  "Industrial Tourism",
  "Parks",
  "Reservoir Areas",
  "Nature Walks",
  "Eco Zones"
],

"Rajanna Sircilla": [
  "Vemulawada Temple",
  "Textile Park",
  "Mid Manair Dam",
  "Rajanna Temple",
  "Temple Clusters",
  "Local Lakes",
  "Village Tourism",
  "Nearby Karimnagar Spots",
  "River Areas",
  "Hill Viewpoints",
  "Cultural Areas",
  "Markets",
  "Traditional Streets",
  "Reservoir Views",
  "Nature Spots"
],

"Ranga Reddy": [
  "Ananthagiri Hills",
  "Chilkur Balaji Temple",
  "Osmansagar Lake",
  "Himayatsagar Lake",
  "Mrugavani National Park",
  "Shankarpally Area",
  "Vikarabad Forest Edge",
  "Temple Clusters",
  "Hill Viewpoints",
  "Local Lakes",
  "Resort Areas",
  "Eco Tourism Zones",
  "Village Tourism",
  "Nature Trails",
  "Nearby Hyderabad Spots"
],

Sangareddy: [
  "Singur Dam",
  "Manjeera Wildlife Sanctuary",
  "Kondapur Museum",
  "Jharasangam Temple",
  "Manjeera River",
  "Forest Areas",
  "Temple Clusters",
  "Village Tourism",
  "Hill Areas",
  "Local Lakes",
  "Nearby Medak Spots",
  "Reservoir Views",
  "Parks",
  "Nature Trails",
  "Eco Tourism"
],

Siddipet: [
  "Komuravelli Mallanna Temple",
  "Kondapochamma Reservoir",
  "Siddipet Lake",
  "Temple Clusters",
  "Local Parks",
  "Village Tourism",
  "Hill Areas",
  "Nearby Medak Spots",
  "Reservoir Views",
  "Cultural Areas",
  "Agriculture Fields",
  "Local Markets",
  "Nature Spots",
  "Water Bodies",
  "Eco Zones"
],

Suryapet: [
  "Mushtyal Temple",
  "Pillalamarri Temple",
  "Nagarjuna Sagar Nearby",
  "Local Lakes",
  "Temple Clusters",
  "Village Tourism",
  "Hill Areas",
  "Nearby Nalgonda Spots",
  "Reservoir Views",
  "Nature Trails",
  "Agriculture Fields",
  "Local Markets",
  "Cultural Areas",
  "Water Bodies",
  "Eco Tourism"
],

Vikarabad: [
  "Ananthagiri Hills",
  "Anantha Padmanabha Temple",
  "Kotepally Reservoir",
  "Vikarabad Forest",
  "Forest Trails",
  "Hill Viewpoints",
  "Temple Clusters",
  "Local Lakes",
  "Village Tourism",
  "Nature Camps",
  "Eco Tourism",
  "Nearby Ranga Reddy Spots",
  "Resort Areas",
  "Water Streams",
  "Trekking Routes"
],

Wanaparthy: [
  "Wanaparthy Palace",
  "Sarala Sagar Dam",
  "Veerabhadra Temple",
  "Temple Clusters",
  "Local Lakes",
  "Village Tourism",
  "Hill Areas",
  "Nearby Mahabubnagar Spots",
  "Reservoir Views",
  "Nature Trails",
  "Agriculture Fields",
  "Cultural Areas",
  "Local Markets",
  "Water Bodies",
  "Eco Zones"
],

"Warangal Rural": [
  "Ramappa Temple",
  "Laknavaram Lake",
  "Pakhal Lake",
  "Bogatha Waterfalls",
  "Forest Areas",
  "Temple Clusters",
  "Hill Viewpoints",
  "Local Lakes",
  "Village Tourism",
  "Eco Tourism",
  "Nearby Mulugu Spots",
  "Nature Trails",
  "Water Streams",
  "Tribal Areas",
  "Forest Routes"
],

"Warangal Urban": [
  "Warangal Fort",
  "Thousand Pillar Temple",
  "Bhadrakali Temple",
  "Kakatiya Musical Garden",
  "Padmakshi Temple",
  "Bhadrakali Lake",
  "Public Garden",
  "Temple Clusters",
  "Historical Sites",
  "Parks",
  "Local Lakes",
  "Cultural Areas",
  "Markets",
  "Urban Tourism Spots",
  "Nearby Rural Attractions"
],

"Yadadri Bhuvanagiri": [
  "Yadadri Temple",
  "Bhongir Fort",
  "Kolanupaka Jain Temple",
  "Surendrapuri",
  "Golden Shiva Temple",
  "Temple Clusters",
  "Hill Viewpoints",
  "Local Lakes",
  "Village Tourism",
  "Nearby Nalgonda Spots",
  "Nature Trails",
  "Cultural Areas",
  "Markets",
  "Water Bodies",
  "Eco Tourism"
]
    };
  
  function Dashboard() {
    const [location, setLocation] = useState("");
    const [budget, setBudget] = useState("");
    const [days, setDays] = useState("");
    const [type, setType] = useState("");
    const [district, setDistrict] = useState("");
    const [plans, setPlans] = useState(null);
    const [, setLoading] = useState(false);
  
    // 🔥 WIKIPEDIA IMAGE
    const getPlaceImage = async (placeName) => {
    try {
      const res = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&titles=${placeName}&prop=pageimages&piprop=thumbnail&pithumbsize=400&format=json&origin=*`
      );

      const data = await res.json();
      const page = Object.values(data.query.pages)[0];

      if (page?.thumbnail?.source) {
        return page.thumbnail.source;
      }
    } catch {}

    return "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
  };

  

  // 🔥 DATASET
  const indiaTourismData = {

  // ===== ALL 28 STATES =====

  "Andhra Pradesh": ["Tirupati","Visakhapatnam","Araku Valley","Vijayawada","Amaravati","Srisailam","Lepakshi","Kurnool","Rajahmundry","Nellore","Chittoor","Eluru","Machilipatnam","Vizianagaram","Srikakulam","Guntur","Horsley Hills","Borra Caves","Simhachalam","Papikondalu","Kakinada","Annavaram","Maredumilli","Pulicat Lake","Dindi","Yanam","Bapatla","Narsapur","Amalapuram","Gudivada","Tuni","Rajampet","Markapur","Adoni","Dharmavaram","Puttaparthi","Proddatur","Kadapa","Ongole","Anantapur"],

  "Arunachal Pradesh": ["Tawang","Ziro Valley","Bomdila","Itanagar","Dirang","Sela Pass","Namdapha","Roing","Pasighat","Aalo","Tezu","Namsai","Anini","Mechuka","Khonsa","Changlang","Daporijo","Yingkiong","Koloriang","Seppa","Hollongi","Bhalukpong","Rupa","Shergaon","Lumla","Zemithang","Hayuliang","Miao","Hawai","Basar","Along","Pangin","Siang Valley","Subansiri","Kameng","Tirap","Dibang Valley","Upper Siang","Lower Dibang","Pakke"],

  "Assam": ["Guwahati","Kaziranga","Majuli","Tezpur","Silchar","Jorhat","Dibrugarh","Haflong","Barpeta","Sivasagar","Tinsukia","Diphu","Bongaigaon","Goalpara","Karimganj","Nagaon","Golaghat","Mangaldoi","Dhemaji","Kokrajhar","Baksa","Chirang","Udalguri","Morigaon","Hojai","Biswanath","Lakhimpur","Darrang","Sonitpur","Karbi Anglong","North Cachar Hills","Kamrup","Kamrup Metro","Dhubri","South Salmara","West Karbi Anglong","Hailakandi","Manas Park","Orang Park","Majuli Island"],

  "Bihar": ["Patna","Bodh Gaya","Nalanda","Rajgir","Vaishali","Gaya","Muzaffarpur","Bhagalpur","Darbhanga","Pawapuri","Sitamarhi","Chapra","Sasaram","Begusarai","Arrah","Motihari","Munger","Katihar","Samastipur","Siwan","Buxar","Kishanganj","Jamui","Rohtas","Sheikhpura","Lakhisarai","Khagaria","Supaul","Madhepura","Araria","Aurangabad","Nawada","Kaimur","West Champaran","East Champaran","Jehanabad","Gopalganj","Saran","Banka","Purnia"],

  "Chhattisgarh": ["Raipur","Bhilai","Bilaspur","Jagdalpur","Ambikapur","Durg","Korba","Raigarh","Kanker","Dantewada","Bastar","Chitrakote Falls","Tirathgarh Falls","Barnawapara","Achanakmar","Kawardha","Dongargarh","Sirpur","Rajim","Mainpat","Jashpur","Kondagaon","Narayanpur","Bijapur","Sukma","Balod","Bemetara","Surajpur","Balrampur","Mahasamund","Gariaband","Dhamtari","Korea","Mungeli","Gaurela","Pendraroad","Pathalgaon","Keshkal","Abujhmad","Indravati"],

  "Goa": ["Baga Beach","Calangute","Anjuna","Vagator","Palolem","Dudhsagar Falls","Fort Aguada","Bom Jesus Basilica","Chapora Fort","Colva","Candolim","Arambol","Butterfly Beach","Panaji","Margao","Reis Magos","Sinquerim","Morjim","Mandovi River","Dona Paula","Miramar Beach","Ashwem Beach","Benaulim","Varca","Cavelossim","Betalbatim","Majorda","Bogmalo","Divar Island","Chorao Island","Fontainhas","Saligao","Siolim","Ponda","Quepem","Canacona","Sanguem","Pernem","Mapusa","Old Goa"],

  "Gujarat": ["Ahmedabad","Statue of Unity","Gir National Park","Somnath","Dwarka","Rann of Kutch","Bhuj","Junagadh","Saputara","Porbandar","Vadodara","Rajkot","Patan","Champaner","Dholavira","Mandvi","Palitana","Gandhinagar","Morbi","Surat","Bhavnagar","Anand","Mehsana","Little Rann","Modhera","Lothal","Zarwani","Wilson Hills","Tithal Beach","Jamnagar","Okha","Somnath Beach","Dwarka Beach","Girnar Hills","Kankaria Lake","Sabarmati Ashram","Adalaj Stepwell","Udwada","Dakor","Ambaji"],

  "Haryana": ["Gurgaon","Kurukshetra","Panipat","Faridabad","Hisar","Rohtak","Panchkula","Karnal","Ambala","Sonipat","Rewari","Bhiwani","Yamunanagar","Sirsa","Jhajjar","Mahendragarh","Palwal","Kaithal","Jind","Narnaul","Pinjore Gardens","Morni Hills","Sultanpur Bird Sanctuary","Surajkund","Tilyar Lake","Badkhal Lake","Damdama Lake","Brahma Sarovar","Jyotisar","Kalanaur","Farrukhnagar","Hodal","Kosli","Safidon","Tohana","Narwana","Gohana","Ladwa","Pehowa","Shahbad"],

  "Himachal Pradesh": ["Shimla","Manali","Dharamshala","Spiti Valley","Kullu","Kasol","Dalhousie","Kasauli","Chamba","Palampur","Solang Valley","Rohtang Pass","Bir Billing","Kalpa","Sangla","Narkanda","Tirthan Valley","Mashobra","Una","Hamirpur","Kangra","Mandi","Bilaspur","Chail","Kufri","Shoja","Jibhi","Barot Valley","Parvati Valley","Malana","Key Monastery","Kaza","Tabo","Nako","Reckong Peo","Rampur","Theog","Rohru","Kotkhai","Sarahan"],

  "Jharkhand": ["Ranchi","Jamshedpur","Dhanbad","Deoghar","Hazaribagh","Giridih","Bokaro","Netarhat","Betla","Palamu","Dumka","Chaibasa","Simdega","Lohardaga","Koderma","Latehar","Godda","Sahebganj","Pakur","Gumla","Khunti","Ramgarh","Chatra","Saraikela","West Singhbhum","East Singhbhum","Parasnath Hill","Hundru Falls","Dassam Falls","Jonha Falls","Patratu Valley","Tilaiya Dam","Maithon Dam","Dimna Lake","Udhwa Lake","Topchanchi Lake","Birsa Zoo","Jagannath Temple","Rajrappa Temple","Baidyanath Dham"],

  "Karnataka": ["Coorg","Mysore","Hampi","Gokarna","Chikmagalur","Jog Falls","Badami","Udupi","Murudeshwar","Kabini","Bandipur","Nandi Hills","Belur","Halebidu","Dandeli","Agumbe","Sakleshpur","Bijapur","Shivanasamudra","Bangalore","Mangalore","Karwar","Kudremukh","Bhadra","Sringeri","Hassan","Raichur","Gulbarga","Bidar","Chitradurga","Tumkur","Kodachadri","Yana","Aihole","Pattadakal","Kolar","Mandya","Dharmasthala","Karkala","Honnemaradu"],

  "Kerala": ["Munnar","Alleppey","Kovalam","Varkala","Wayanad","Thekkady","Athirappilly","Kochi","Kumarakom","Bekal","Poovar","Marari","Silent Valley","Ponmudi","Ashtamudi","Periyar","Thrissur","Guruvayur","Padmanabhaswamy","Fort Kochi","Kollam","Palakkad","Malampuzha","Idukki","Vagamon","Kozhikode","Kannur","Kasargod","Cherai","Thenmala","Meesapulimala","Parunthumpara","Nelliyampathy","Kottayam","Pathanamthitta","Ernakulam","Nilambur","Chalakudy","Bekal Beach","Alappuzha"],

  "Madhya Pradesh": ["Bhopal","Indore","Gwalior","Jabalpur","Ujjain","Sanchi","Khajuraho","Pachmarhi","Kanha","Bandhavgarh","Panna","Orchha","Mandav","Maheshwar","Omkareshwar","Chitrakoot","Amarkantak","Burhanpur","Ratlam","Rewa","Satna","Sehore","Hoshangabad","Betul","Chhindwara","Balaghat","Dewas","Khandwa","Neemuch","Mandsaur","Shivpuri","Datia","Tikamgarh","Vidisha","Damoh","Katni","Seoni","Singrauli","Anuppur","Dindori"],

  "Maharashtra": ["Mumbai","Pune","Lonavala","Mahabaleshwar","Ajanta","Ellora","Shirdi","Nashik","Alibaug","Kolhapur","Aurangabad","Tadoba","Ratnagiri","Sindhudurg","Nagpur","Matheran","Bhandardara","Lavasa","Satara","Solapur","Harihareshwar","Diveagar","Ganpatipule","Chiplun","Igatpuri","Karjat","Khandala","Tarkarli","Malvan","Wardha","Amravati","Chandrapur","Beed","Jalgaon","Dhule","Parbhani","Nanded","Osmanabad","Hingoli","Yavatmal"],

  "Manipur": ["Imphal","Loktak Lake","Kangla Fort","Ukhrul","Churachandpur","Thoubal","Bishnupur","Senapati","Tamenglong","Chandel","Jiribam","Moreh","Kakching","Noney","Kamjong","Pherzawl","Andro","Moirang","Leimaram","Sekmai","Keibul Lamjao","Khonghampat","Langol","Waithou Lake","Tharon Cave","Dzuko Valley","Shirui Hills","Koubru Hills","Barak Falls","Singda Dam","Khuga Dam","Ibudhou Temple","INA Memorial","War Cemetery","Manipur Zoo","Museum Imphal","Eco Park","Red Hill","Kaina Temple","Heingang"],

  "Meghalaya": ["Shillong","Cherrapunji","Mawlynnong","Dawki","Tura","Jowai","Nongpoh","Baghmara","Williamnagar","Mairang","Laitlum Canyon","Umiam Lake","Elephant Falls","Nohkalikai Falls","Seven Sisters Falls","Living Root Bridge","Double Decker Bridge","Sohra","Mawphlang","Balpakram","Nokrek","Resubelpara","Ampati","Khliehriat","Mawkyrwat","Ranikor","Nartiang","Krang Suri Falls","Shnongpdeng","Pynursla","Mawshynrut","Nongstoin","Chadare","Siju Caves","Nongkhnum Island","Thadlaskein Lake","Jakrem","Dainthlen Falls","Weinia Falls","Mawkdok"],

  "Mizoram": ["Aizawl","Lunglei","Champhai","Serchhip","Kolasib","Saiha","Lawngtlai","Mamit","Hnahthial","Khawzawl","Saitual","Reiek","Hmuifang","Phawngpui","Vantawng Falls","Tamdil Lake","Palak Lake","Rih Dil","Dampa Tiger Reserve","Murlen Park","Falkawn Village","Lengteng","Sialsuk","Thenzawl","Zokhawthar","Tuipang","Tlabung","Thingsulthliah","Biate","Chawngte","Kawrthah","North Vanlaiphai","South Vanlaiphai","Keifang","Bunghmun","Serkawn","Hnahlan","Chhingpui","Khawbung","Zote"],

  "Nagaland": ["Kohima","Dimapur","Mokokchung","Mon","Wokha","Zunheboto","Phek","Tuensang","Longleng","Kiphire","Peren","Chumoukedima","Tseminyu","Meluri","Pfutsero","Khonoma","Dzuko Valley","Japfu Peak","Shilloi Lake","Doyang River","Intanki Park","Puliebadze","Kachari Ruins","Green Park","Triple Falls","Ntangki","Benreu","Khezhakeno","Viswema","Jakhama","Chizami","Kikruma","Changtongya","Longkhum","Ungma","Alichen","Yisemyong","Shamator","Chessore","Noklak"],

  "Odisha": ["Bhubaneswar","Puri","Konark","Chilika Lake","Cuttack","Rourkela","Sambalpur","Berhampur","Balasore","Baripada","Jeypore","Koraput","Rayagada","Phulbani","Keonjhar","Jharsuguda","Angul","Dhenkanal","Paradeep","Jagatsinghpur","Kendrapara","Bhadrak","Nayagarh","Bolangir","Kalahandi","Nuapada","Bargarh","Sonepur","Mayurbhanj","Simlipal","Satkosia","Hirakud Dam","Debrigarh","Gopalpur","Chandipur","Taptapani","Harishankar","Nrusinghanath","Udayagiri","Ratnagiri"],

  "Punjab": ["Amritsar","Ludhiana","Patiala","Bathinda","Kapurthala","Mohali","Pathankot","Faridkot","Fatehgarh Sahib","Moga","Hoshiarpur","Gurdaspur","Ropar","Muktsar","Sangrur","Barnala","Tarn Taran","Batala","Abohar","Malerkotla","Phagwara","Zirakpur","Rajpura","Nabha","Samana","Sunam","Dera Baba Nanak","Harike Wetland","Kila Raipur","Sirhind","Talwandi Sabo","Mukerian","Dasuya","Nakodar","Golden Temple","Wagah Border","Jallianwala Bagh","Anandpur Sahib","Chandigarh nearby","Ropar Wetland"],

  "Rajasthan": ["Jaipur","Udaipur","Jaisalmer","Jodhpur","Mount Abu","Pushkar","Ajmer","Bikaner","Chittorgarh","Ranthambore","Alwar","Bharatpur","Kota","Bundi","Neemrana","Osian","Mandawa","Barmer","Nagaur","Sawai Madhopur","Kumbhalgarh","Dungarpur","Sirohi","Jhalawar","Tonk","Pali","Shekhawati","Deeg","Amer Fort","Hawa Mahal","City Palace","Mehrangarh Fort","Lake Pichola","Fateh Sagar","Sam Sand Dunes","Abhaneri","Kishangarh","Baran","Rajsamand","Pratapgarh"],

  "Sikkim": ["Gangtok","Tsomgo Lake","Nathula Pass","Pelling","Lachung","Lachen","Yumthang Valley","Ravangla","Namchi","Zuluk","Yuksom","Gurudongmar Lake","Rumtek Monastery","Tashiding","Phodong","Mangan","Singhik","Rangpo","Soreng","Dentam","Legship","Dzongu","Hee Bermiok","Rimbi Falls","Kanchenjunga Base","Kabi Lungchok","Chungthang","Thangu","Baba Mandir","Samdruptse","Temi Tea Garden","Pemayangtse","Rabdentse","Kewzing","Yangang","Bermiok","Kaluk","Okhrey","Sombaria","Nayabazar"],

  "Tamil Nadu": ["Ooty","Kodaikanal","Chennai","Mahabalipuram","Rameswaram","Madurai","Kanyakumari","Yercaud","Coimbatore","Thanjavur","Hogenakkal","Coonoor","Dhanushkodi","Vellore","Salem","Nagapattinam","Pollachi","Trichy","Velankanni","Chidambaram","Kanchipuram","Tirunelveli","Courtallam","Yelagiri","Kotagiri","Sirumalai","Valparai","Pichavaram","Pulicat Lake","Gingee Fort","Srirangam","Theni","Dharmapuri","Auroville","Mettupalayam","Hosur","Karur","Mayiladuthurai","Tiruvannamalai","Erode"],

  "Telangana": ["Hyderabad","Warangal","Nizamabad","Karimnagar","Khammam","Mahbubnagar","Adilabad","Medak","Rangareddy","Sangareddy","Nalgonda","Suryapet","Jagitial","Mancherial","Peddapalli","Jayashankar","Mulugu","Bhadradri","Vikarabad","Narayanpet","Wanaparthy","Jogulamba","Gadwal","Kamareddy","Medchal","Hanamkonda","Yadadri","Kuntala Falls","Bogatha Falls","Laknavaram Lake","Ramappa Temple","Golconda Fort","Charminar","Hussain Sagar","Birla Mandir","Ramoji Film City","Ananthagiri Hills","Basara","Pocharam","Alampur"],

  "Tripura": ["Agartala","Udaipur","Dharmanagar","Kailashahar","Belonia","Ambassa","Khowai","Sabroom","Teliamura","Amarpur","Sonamura","Jirania","Kamalpur","Kumarghat","Melaghar","Sepahijala","Gumti","Unakoti","Neermahal","Ujjayanta Palace","Jagannath Temple","Tripura Sundari","Heritage Park","Clouded Leopard Park","Sipahijala Park","Dumboor Lake","Rudrasagar Lake","Boxanagar","Chabimura","Deotamura","Pilak","Mahamuni","Fatikroy","Panisagar","Jampui Hills","Vanghmun","Betlingchhip","Kanchanpur","Laxmipur","Rajnagar"],

  "Uttar Pradesh": ["Agra","Varanasi","Lucknow","Ayodhya","Mathura","Vrindavan","Sarnath","Prayagraj","Jhansi","Chitrakoot","Dudhwa","Meerut","Kanpur","Gorakhpur","Noida","Ghaziabad","Aligarh","Bareilly","Kushinagar","Shravasti","Bithoor","Hastinapur","Mirzapur","Sonbhadra","Deoria","Ballia","Azamgarh","Sitapur","Hardoi","Unnao","Firozabad","Mainpuri","Rampur","Sambhal","Amethi","Raebareli","Pilibhit","Etawah","Fatehpur Sikri","Taj Mahal"],

  "Uttarakhand": ["Rishikesh","Haridwar","Nainital","Mussoorie","Auli","Kedarnath","Badrinath","Jim Corbett","Almora","Pithoragarh","Valley of Flowers","Chopta","Tehri","Lansdowne","Ranikhet","Gangotri","Yamunotri","Dehradun","Harsil","Kausani","Bhimtal","Sattal","Mukteshwar","Dharchula","Munsiyari","Dhanaulti","Kanatal","Pauri","Joshimath","Rudraprayag","Devprayag","Karnaprayag","Bageshwar","Champawat","Sitlakhet","Berinag","Lohaghat","Didihat","Ukhimath","Guptkashi"],

  "West Bengal": ["Kolkata","Darjeeling","Siliguri","Digha","Kalimpong","Sundarbans","Howrah","Murshidabad","Cooch Behar","Jalpaiguri","Malda","Bankura","Purulia","Asansol","Durgapur","Bardhaman","Krishnanagar","Kalyani","Barrackpore","Chandannagar","Bishnupur","Bolpur","Shantiniketan","Tarapith","Mayapur","Gangasagar","Bakkhali","Frazerganj","Diamond Harbour","Haldia","Midnapore","Jhargram","Alipurduar","Falakata","Kurseong","Raiganj","Balurghat","Islampur","Ranaghat","Contai"],

  // ===== 8 UNION TERRITORIES =====

  "Delhi": ["India Gate","Red Fort","Qutub Minar","Lotus Temple","Akshardham","Humayun Tomb","Jama Masjid","Raj Ghat","Lodhi Garden","Connaught Place","Chandni Chowk","Purana Qila","National Museum","Dilli Haat","Hauz Khas","Garden of Five Senses","ISKCON Temple","Safdarjung Tomb","Parliament","Rashtrapati Bhavan","Agrasen Ki Baoli","Bangla Sahib","Rail Museum","Zoo","Teen Murti","Craft Museum","Siri Fort","Tughlaqabad","Jantar Mantar","Select Citywalk","DLF Mall","Mehrauli Park","Yamuna Ghat","Asola","Okhla Bird Sanctuary","Majnu Ka Tila","Shankar Museum","Planetarium","National Gallery","Feroz Shah Kotla"],

  "Jammu and Kashmir": ["Srinagar","Gulmarg","Pahalgam","Sonmarg","Jammu","Vaishno Devi","Anantnag","Baramulla","Kupwara","Pulwama","Dachigam","Patnitop","Aru Valley","Betaab Valley","Yusmarg","Doda","Kishtwar","Rajouri","Poonch","Udhampur","Verinag","Kokernag","Charar","Aharbal","Gurez","Lolab","Bangus","Sanasar","Mansar Lake","Surinsar","Bhaderwah","Sinthan","Zojila","Katra","Akhnoor","Basohli","Reasi","Chenani","Samba","Kathua"],

  "Ladakh": ["Leh","Pangong Lake","Nubra Valley","Khardung La","Tso Moriri","Magnetic Hill","Zanskar","Lamayuru","Diskit","Hemis","Alchi","Kargil","Dras","Hanle","Chang La","Stok","Shey","Thiksey","Basgo","Turtuk","Sumur","Panamik","Suru Valley","Uleytokpo","Chushul","Nyoma","Dha-Hanu","Mulbekh","Saspol","Tanglang La","Zoji La","Padum","Phugtal","Karzok","Spituk","Matho","Rumbak","Yarab Tso","Rumtse","Tikse"],

  "Puducherry": ["Promenade Beach","Paradise Beach","Auroville","Rock Beach","French Quarter","Serenity Beach","Botanical Garden","Chunnambar","Aurobindo Ashram","Yanam","Karaikal Beach","Mahe","Arikamedu","Bharathi Park","Ousteri Lake","Sacred Heart","Immaculate","Market","Lighthouse","White Town","Paradise Island","Museum","Vinayagar Temple","Basilica","Beach Road","Mission Street","Lawspet","Mudaliarpet","Red Hills","Villiyanur","Bahour","Kalapet","Ariyankuppam","Muthialpet","Thirukkanur","Nettapakkam","Kottucherry","Pondy Marina","Cluny","Backwaters"],

  "Andaman and Nicobar Islands": ["Port Blair","Havelock","Neil Island","Radhanagar","Cellular Jail","Ross Island","Baratang","North Bay","Diglipur","Little Andaman","Chidiya Tapu","Wandoor","Mayabunder","Campbell Bay","Car Nicobar","Barren Island","Long Island","Rangat","Kalapathar","Cinque Island","Red Skin","Jolly Buoy","Corbyn Cove","Viper Island","Mount Harriet","Interview Island","Narcondam","Great Nicobar","Smith Island","Ross Smith","Rutland","Hut Bay","Katchal","Kamorta","Nancowry","Little Nicobar","Teressa","Trinket","Flat Island","South Bay"],

  "Chandigarh": ["Rock Garden","Sukhna Lake","Rose Garden","Elante Mall","Sector 17","Capitol Complex","Leisure Valley","Museum","Terraced Garden","Japanese Garden","Butterfly Park","Zoo","Open Hand","Garden of Silence","Bougainvillea","Topiary Park","Hibiscus Garden","Fitness Trails","Shanti Kunj","Fragrance Garden","Pinjore","Morni Hills","Lake Park","Children Park","Sector 10","Sector 36","Sector 22","IT Park","Rose Festival","Lake Club","Bird Sanctuary","Green Belt","Nature Trail","Cycling Track","Art Gallery","War Memorial","Dolls Museum","Cactus Garden","Town Hall","Heritage Street"],

  "Lakshadweep": ["Agatti","Bangaram","Kavaratti","Minicoy","Kadmat","Kalpeni","Amini","Andrott","Bitra","Chetlat","Suheli","Pitti","Marine Museum","Lighthouse","Lagoon Beach","Coral Reef","Scuba","Snorkeling","Boat Tours","Resorts","Kadmat Beach","Minicoy Light","Aquarium","Kalpeni Lagoon","Agatti Beach","Bangaram Beach","Thinnakara","Parali","Cheriyam","Marine Life","Water Sports","Kayaking","Glass Boat","Sunset Point","Camping","Village","Fishing","Dolphin","Lagoon Walk","Coral Islands"],

  "Dadra and Nagar Haveli and Daman and Diu": ["Daman","Diu","Silvassa","Jampore","Devka","Nagoa","Naida Caves","Diu Fort","Bom Jesus","Lion Safari","Vanganga","Hirwa Van","Dudhni","Mirasol","Deer Park","Gangeshwar","St Paul","Monastery","Zampa","Museum","Jetty Garden","Daman Fort","Lighthouse","Island Garden","Nakshatra","Bindrabin","Bal Udyan","Amli Lake","Museum Silvassa","Tribal Museum","Damanganga","Kadaiya","Madhuban","Van Ganga","Hirwa Park","Portuguese Fort","Amusement Park","Fort Walls","Sunset","Promenade"]

};
  const placesList = Object.keys(indiaTourismData);

  // 🔥 BUDGET DATA
 const minBudgetPerDay = {
  "Andhra Pradesh": 1200,
  "Arunachal Pradesh": 1800,
  "Assam": 1400,
  "Bihar": 1000,
  "Chhattisgarh": 1100,
  "Goa": 2500,
  "Gujarat": 1500,
  "Haryana": 1600,
  "Himachal Pradesh": 2000,
  "Jharkhand": 1100,
  "Karnataka": 1800,
  "Kerala": 2000,
  "Madhya Pradesh": 1400,
  "Maharashtra": 1800,
  "Odisha": 1300,
  "Punjab": 1600,
  "Rajasthan": 1700,
  "Tamil Nadu": 1500,
  "Telangana": 1400,
  "Uttar Pradesh": 1300,
  "West Bengal": 1400,
  "Delhi": 2000
};

  const travelTypeMultiplier = {
    Solo: 1,
    Friends: 0.9,
    Family: 1.4
  };



//   Generate 3 different travel plans based on user input.

// Display:
// - 3 separate cards:
//    1. Fast Plan
//    2. Balanced Plan
//    3. Relaxed Plan

// Each card should include:
// - Day-wise itinerary (Day 1, Day 2…)
// - Different places for each plan
// - Destination image
// - Save button

// Style:
// - Attractive card layout with hover effects

  const generatePlan = async () => {
    setPlans(null);
    setLoading(true);

    const d = parseInt(days);

if (!location || !budget || !days || !type) {
  alert("Fill all fields");
  setLoading(false);
  return;
}
// 🔥 Telangana district validation
    if (location === "Telangana" && !district) {
      alert("Please select district for Telangana");
      setLoading(false);
      return;
    }
// 🔥 BUDGET CHECK
    const minPerDay = minBudgetPerDay[location] || 1500;
    const multiplier = travelTypeMultiplier[type] || 1;

    const adjustedPerDay = Math.round(minPerDay * multiplier);
    const requiredBudget = adjustedPerDay * d;

    if (budget < requiredBudget) {
      alert(
        `⚠️ Budget too low!\n\n` +
        `Trip Type: ${type}\n` +
        `Min Budget for ${location}: ₹${adjustedPerDay}/day\n` +
        `Total required: ₹${requiredBudget}`
      );
      setLoading(false);
      return;
    }
    let selectedPlaces = [];

    if (location === "Telangana") {
      selectedPlaces = telanganaDistrictData[district];
    } else {
      selectedPlaces = indiaTourismData[location];
    }

    let allPlaces = await Promise.all(
      selectedPlaces.map(async (name) => ({
        name,
        image: await getPlaceImage(name)
      }))
    );

    const createPlan = (count) => {
      let result = [];
      let i = 0;

      for (let d1 = 0; d1 < d; d1++) {
        let day = [];

        for (let j = 0; j < count; j++) {
          day.push(allPlaces[i % allPlaces.length]);
          i++;
        }

        result.push(day);
      }

      return result;
    };

    setPlans({
      Fast: createPlan(5),
      Balanced: createPlan(3),
      Relaxed: createPlan(2)
    });

    setLoading(false);
  };

  return (
    <div>
      <Navbar />

      <div className="dashboard">
        <div className="planner-card">
          <h2>India Trip Planner 🇮🇳</h2>

          <select onChange={(e) => setLocation(e.target.value)}>
            <option>Select State</option>
            {placesList.map((p, i) => (
              <option key={i} value={p}>{p}</option>
            ))}
          </select>

          {/* 🔥 DISTRICT (ONLY TELANGANA) */}
{location === "Telangana" && (
  <select
    value={district}
    onChange={(e) => setDistrict(e.target.value)}
  >
    <option value="">Select District</option>
    {Object.keys(telanganaDistrictData).map((d, i) => (
      <option key={i} value={d}>{d}</option>
    ))}
  </select>
)}



          <input type="number" placeholder="Budget" onChange={(e) => setBudget(e.target.value)} />
          <input type="number" placeholder="Days" onChange={(e) => setDays(e.target.value)} />

          <select onChange={(e) => setType(e.target.value)}>
            <option>Type</option>
            <option>Family</option>
            <option>Friends</option>
            <option>Solo</option>
          </select>

          {/* 🔥 SHOW BUDGET */}
          {location && type && (
            <p style={{ color: "#ff9800", fontWeight: "bold" }}>
              Min Budget: ₹
              {Math.round(
                (minBudgetPerDay[location] || 1500) *
                (travelTypeMultiplier[type] || 1)
              )} / day
            </p>
          )}

          <button onClick={generatePlan}>Generate</button>
        </div>

        {plans && (
          <div className="result">
            {Object.keys(plans).map((type) => (
              <div key={type} className="plan-box">
                <h3>{type.toUpperCase()}</h3>

                {plans[type].map((day, i) => (
                  <div key={i}>
                    <h4>Day {i + 1}</h4>

                    <div className="places-grid">
                      {day.map((p, j) => (
                        <div className="place-card" key={j}>
                          <img src={p.image} alt={p.name} />
                          <p>{p.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;