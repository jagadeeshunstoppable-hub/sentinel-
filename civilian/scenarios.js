// SENTINEL-X Civilian Platform — Realistic India & Tamil Nadu Emergency Scenarios
// Designed specifically for Indian emergency response, Tamil voice inputs, and regional landmarks.

const CIVILIAN_SCENARIOS = {
  tamil_medical: {
    id: "SCN-TN-01",
    key: "tamil_medical",
    category: "catMedical",
    title: {
      en: "Tamil Medical Emergency: Elderly Fall & Breathing Distress",
      ta: "முதியவர் கீழே விழுந்து மூச்சுத்திணறல் (தமிழ் குரல் அவசரம்)",
      hi: "बुजुर्ग के गिरने व सांस लेने में तकलीफ (तमिल वॉइस इमरजेंसी)"
    },
    language: "ta",
    caller: {
      name: "செந்தில் குமார் (Senthil Kumar)",
      phone: "+91 98401 XXXXX",
      source: "VOICE (தமிழ்)",
      locationName: "அண்ணா நகர் மேற்கு, சென்னை (Anna Nagar West, Chennai)",
      landmark: "Near Roundtana, 4th Avenue, Anna Nagar",
      district: "Chennai (சென்னை)",
      state: "Tamil Nadu (தமிழ்நாடு)",
      pin: "600040",
      coords: [13.0850, 80.2101]
    },
    voiceTranscript: [
      { speaker: "108 CAD", text: "வணக்கம், 108 அவசர உதவி மையம். என்ன அவசரநிலை?", lang: "ta" },
      { speaker: "Caller", text: "ஐயா! என் அப்பா கீழே விழுந்துட்டாரு! மூச்சு விட ரொம்ப கஷ்டமா இருக்கு, பேசவே முடியல!", lang: "ta" },
      { speaker: "108 CAD", text: "பதற்றப்படாதீர்கள். நோயாளிக்கு சுயநினைவு உள்ளதா?", lang: "ta" },
      { speaker: "Caller", text: "கண் திறக்கிறாரு ஆனா பேச முடியல. நெஞ்சை பிடிச்சுகிட்டு தவிக்கிறாரு. சீக்கிரம் வண்டி அனுப்புங்க!", lang: "ta" },
      { speaker: "108 CAD", text: "உடனடி தீவிர சிகிச்சை ஆம்புலன்ஸ் அனுப்பப்படுகிறது. வண்டி வரும்வரை நோயாளியை படுக்க வைக்கவும்.", lang: "ta" }
    ],
    youSaidText: "என் அப்பா கீழே விழுந்துட்டாரு. மூச்சு விட கஷ்டமா இருக்கு.",
    weUnderstoodSummary: {
      en: "Fall trauma with severe acute respiratory distress and compromised speech. Suspected cardiac/hypoxic emergency.",
      ta: "கீழே விழுந்ததால் ஏற்பட்ட காயம், கடுமையான மூச்சுத்திணறல் மற்றும் பேச இயலாமை. உடனடி தீவிர சிகிச்சை தேவை.",
      hi: "गिरने से चोट और सांस लेने में गंभीर कठिनाई। तत्काल आपातकालीन चिकित्सा आवश्यक।"
    },
    triage: {
      urgency: "CRITICAL",
      confidence: "98.2%",
      possibleCondition: {
        en: "Trauma-Induced Respiratory Failure / Acute Coronary Syndrome",
        ta: "காயத்தினால் ஏற்பட்ட மூச்சுத்திணறல் / தீவிர இதய பாதிப்பு சந்தேகம்",
        hi: "चोट जनित श्वसन विफलता / तीव्र हृदय समस्या"
      },
      symptoms: [
        { en: "Severe dyspnea (gasping for air)", ta: "கடுமையான மூச்சுத்திணறல்", hi: "सांस लेने में भारी तकलीफ" },
        { en: "Blunt fall trauma to back & chest", ta: "முதுகு மற்றும் நெஞ்சில் விழுந்த காயம்", hi: "सीने व पीठ पर चोट" },
        { en: "Restricted vocalization / Inability to speak", ta: "பேச முடியாத நிலை", hi: "बोलने में असमर्थ" }
      ],
      aiReasoning: [
        { en: "Immediate airway compromise detected from caller acoustics", ta: "குரல் பதிவில் தீவிர மூச்சுத்திணறல் உறுதி செய்யப்பட்டது" },
        { en: "High mortality risk within 10 minutes without oxygenation", ta: "10 நிமிடங்களுக்குள் ஆக்சிஜன் வழங்கப்படாவிட்டால் உயிருக்கு ஆபத்து" },
        { en: "Advanced Life Support (ALS) with mechanical CPR and intubation required", ta: "செயற்கை சுவாச உபகரணங்கள் கொண்ட தீவிர சிகிச்சை ஆம்புலன்ஸ் தேவை" }
      ]
    },
    fleet: {
      selectedUnit: "TN-108-ALS-04 (Anna Nagar)",
      vehicleType: "Advanced Life Support (ALS) Ambulance",
      distance: "1.8 km",
      initialEtaSec: 240, // 4 min
      crew: "Dr. K. Vignesh (Paramedic Lead) + EMT Anand",
      equipment: "Lucas-3 CPR, Oxygenator, Defibrillator, IV Kit",
      reasoning: {
        en: "Closest available ALS ambulance equipped with portable ventilator, located at Anna Nagar Depot (1.8 km).",
        ta: "அண்ணா நகர் பணிமனையில் தயார் நிலையில் உள்ள செயற்கை சுவாசக்கருவி கொண்ட மிக அருகில் உள்ள 108 ALS ஊர்தி (1.8 கி.மீ).",
        hi: "अन्ना नगर डिपो में उपलब्ध वेंटिलेटर युक्त सबसे नजदीकी 108 एएलएस एम्बुलेंस (1.8 किमी)।"
      }
    },
    route: {
      polyline: [
        [13.0900, 80.2000],
        [13.0880, 80.2050],
        [13.0865, 80.2080],
        [13.0850, 80.2101],
        [13.0830, 80.2150],
        [13.0810, 80.2200],
        [13.0805, 80.2785]
      ],
      signalsPreempted: 3,
      greenCorridorRoad: "EVLS Green Corridor via Poonamallee High Road"
    },
    hospital: {
      name: "Rajiv Gandhi Government General Hospital (RGGGH)",
      tamilName: "ராஜீவ் காந்தி அரசு பொது மருத்துவமனை (சென்னை GH)",
      type: "Level 1 Apex Government Trauma & Critical Care Center",
      distance: "6.8 km",
      eta: "11 min",
      bedsAvailable: 4,
      traumaBayReady: true,
      coords: [13.0805, 80.2785]
    },
    vitals: {
      hr: 122,
      spo2: "89%",
      bp: "92/58",
      gcs: "E3V2M5 (10/15)",
      rhythm: "Sinus Tachycardia with ST elevation"
    }
  },

  highway_accident: {
    id: "SCN-TN-02",
    key: "highway_accident",
    category: "catAccident",
    title: {
      en: "GST Highway Multi-Vehicle Collision with Entrapment",
      ta: "ஜி.எஸ்.டி தேசிய நெடுஞ்சாலை விபத்து (உடனடி மீட்பு தேவை)",
      hi: "जीएसटी हाईवे पर भीषण सड़क दुर्घटना (फंसे हुए लोग)"
    },
    language: "en",
    caller: {
      name: "Ramesh Babu (Highway Patrol Patrolman)",
      phone: "+91 94440 XXXXX",
      source: "SOS TELEMATICS",
      locationName: "NH-48 / GST Road, near Sriperumbudur Toll",
      landmark: "Opposite Hyundai Gate 2, Sriperumbudur",
      district: "Kanchipuram (காஞ்சிபுரம்)",
      state: "Tamil Nadu (தமிழ்நாடு)",
      pin: "602105",
      coords: [12.9698, 79.9405]
    },
    voiceTranscript: [
      { speaker: "112 CAD", text: "Highway Patrol CAD, report exact coordinates.", lang: "en" },
      { speaker: "Patrolman", text: "Major crash near Sriperumbudur Toll! An SUV collided with an interstate lorry.", lang: "en" },
      { speaker: "112 CAD", text: "Are occupants trapped inside the crushed frame?", lang: "en" },
      { speaker: "Patrolman", text: "Yes, two passengers pinned by deformed steering column. Heavy extrication cutters needed immediately!", lang: "en" }
    ],
    youSaidText: "Major crash near Sriperumbudur. Two passengers trapped under crushed frame. Bleeding heavily.",
    weUnderstoodSummary: {
      en: "High-speed highway collision with structural passenger compartment intrusion and bilateral entrapment.",
      ta: "அதிவேக நெடுஞ்சாலை விபத்து, இடிபாடுகளில் சிக்கிய இரண்டு பயணிகள் மற்றும் பலத்த ரத்தப்போக்கு.",
      hi: "हाईवे पर भीषण टक्कर, वाहन में फंसे दो यात्री और अत्यधिक रक्तस्राव।"
    },
    triage: {
      urgency: "CRITICAL",
      confidence: "99.1%",
      possibleCondition: {
        en: "Poly-Trauma, Crushed Extremities & Hemorrhagic Shock",
        ta: "பலத்த எலும்பு முறிவு மற்றும் தீவிர ரத்த இழப்பு அதிர்ச்சி",
        hi: "गंभीर मल्टीप्ल चोटें व रक्तस्राव आघात"
      },
      symptoms: [
        { en: "Mechanical passenger entrapment", ta: "வாகன இடிபாடுகளில் சிக்கிய நிலை", hi: "गाड़ी में फंसे यात्री" },
        { en: "Active arterial bleeding from lower limbs", ta: "கால்களில் பலத்த ரத்தப்போக்கு", hi: "पैरों से तेज रक्तस्राव" },
        { en: "Decreasing peripheral pulse", ta: "குறைந்து வரும் நாடித் துடிப்பு", hi: "कमजोर होती नब्ज" }
      ],
      aiReasoning: [
        { en: "Dual response mandated: Hydraulic cutter fire rescue + ALS trauma ambulance", ta: "தீயணைப்பு மீட்பு ஊர்தி மற்றும் தீவிர சிகிச்சை ஆம்புலன்ஸ் இரண்டும் தேவை" },
        { en: "Golden hour protocol initiated for Level 1 Trauma Center", ta: "முதல் ஒரு மணி நேர அவசர சிகிச்சை நெறிமுறை உடனடியாக தொடங்கப்பட்டது" }
      ]
    },
    fleet: {
      selectedUnit: "TN-108-TRAUMA-09 + RESCUE-02",
      vehicleType: "Dual Dispatch: Trauma ALS + Hydraulic Fire Tender",
      distance: "2.4 km",
      initialEtaSec: 300, // 5 min
      crew: "Capt. Murugan (Rescue) + Paramedic S. Divya",
      equipment: "Holmatro Hydraulic Cutters, Spine Board, C-Collar, Blood Expander",
      reasoning: {
        en: "Selected for combined mechanical extrication and immediate blood transfusion capability within 5 min radius.",
        ta: "இடிபாடுகளை வெட்டி எடுக்க ஹைட்ராலிக் கட்டர் மற்றும் உடனடி ரத்த உறைவு சிகிச்சை கொண்ட ஒருங்கிணைந்த ஊர்திகள்.",
        hi: "कटर मशीन और तत्काल ट्रॉमा देखभाल क्षमता युक्त संयुक्त बचाव दल।"
      }
    },
    route: {
      polyline: [
        [12.9800, 79.9300],
        [12.9750, 79.9350],
        [12.9698, 79.9405],
        [12.9650, 79.9450],
        [12.9550, 79.9600]
      ],
      signalsPreempted: 4,
      greenCorridorRoad: "NH-48 Outer Corridor Express Clear"
    },
    hospital: {
      name: "Sri Ramachandra Institute of Higher Education & Research (SRMC)",
      tamilName: "ஸ்ரீ ராமச்சந்திரா மருத்துவக் கல்லூரி மருத்துவமனை (போரூர்)",
      type: "Level 1 Comprehensive Trauma and Vascular Surgery Center",
      distance: "14.2 km",
      eta: "14 min",
      bedsAvailable: 6,
      traumaBayReady: true,
      coords: [13.0380, 80.1420]
    },
    vitals: {
      hr: 134,
      spo2: "92%",
      bp: "84/50",
      gcs: "E2V3M5 (10/15)",
      rhythm: "Tachycardia, hypovolemic pulse pattern"
    }
  },

  chemical_fire: {
    id: "SCN-TN-03",
    key: "chemical_fire",
    category: "catFire",
    title: {
      en: "Factory Fire + Injured Person (Industrial Chemical Estate, Ennore)",
      ta: "தொழிற்சாலை தீ விபத்து மற்றும் காயம் (எண்ணூர் தொழில்துறை)",
      hi: "कारखाने में आग और घायल व्यक्ति (एन्नोर औद्योगिक क्षेत्र)"
    },
    language: "ta",
    caller: {
      name: "முருகேசன் (Plant Safety Supervisor)",
      phone: "+91 94451 XXXXX",
      source: "EMERGENCY BEACON / VOICE",
      locationName: "எண்ணூர் அனல்மின் நிலைய சாலை, சென்னை (Ennore Industrial Corridor)",
      landmark: "Near Ennore Creek Bridge, Manali Industrial Park",
      district: "Tiruvallur (திருவள்ளூர்)",
      state: "Tamil Nadu (தமிழ்நாடு)",
      pin: "600057",
      coords: [13.2120, 80.3150]
    },
    missingInfoCheck: {
      en: "Chemical class identified: Hydrocarbon Solvent. Casualties: 4 trapped. Wind direction: West-Southwest. Evacuation radius: 500m.",
      ta: "வேதியியல் வகை கண்டறியப்பட்டது: ஹைட்ரோகார்பன் கரைப்பான். காயமடைந்தோர்: 4 நபர்கள். காற்றின் திசை: தென்மேற்கு. வெளியேற்ற ஆரம்: 500 மீ.",
      hi: "रासायनिक वर्ग पहचाना गया: हाइड्रोकार्बन सॉल्वेंट। हताहत: 4 व्यक्ति। हवा की दिशा: दक्षिण-पश्चिम।"
    },
    voiceTranscript: [
      { speaker: "101/108", text: "தீயணைப்பு மற்றும் அவசர கட்டுப்பாட்டு அறை, சொல்லுங்கள்.", lang: "ta" },
      { speaker: "Caller", text: "ஐயா! ரசாயன குடோனில் தீப்பிடித்து வெடித்துவிட்டது! மஞ்சள் நிற நச்சுப் புகை கிளம்புகிறது!", lang: "ta" },
      { speaker: "101/108", text: "உள்ளே யாராவது சிக்கியுள்ளார்களா? காற்று எத்திசையில் வீசுகிறது?", lang: "ta" },
      { speaker: "Caller", text: "நான்கு தொழிலாளர்கள் மூச்சுத்திணறி மயங்கி விழுந்துவிட்டனர்! நச்சுக்காற்று குடியிருப்பு பகுதி நோக்கி வீசுகிறது!", lang: "ta" }
    ],
    youSaidText: "ரசாயன குடோனில் தீப்பிடித்து நச்சுப்புகை கிளம்புகிறது. தொழிலாளர்கள் மயங்கி விழுந்துவிட்டனர்.",
    weUnderstoodSummary: {
      en: "Factory chemical flash fire with toxic vapor cloud, 4 casualties, and immediate Burn ICU + HAZMAT squad requirement.",
      ta: "தொழிற்சாலை தீ விபத்து, நச்சு வாயு கசிவு, 4 தொழிலாளர்கள் காயம். உடனடி தீயணைப்பு + தீவிர சிகிச்சை ஆம்புலன்ஸ் தேவை.",
      hi: "कारखाने में रासायनिक आग, जहरीली गैस का रिसाव, 4 घायल। तत्काल फायर और एम्बुलेंस की आवश्यकता।"
    },
    triage: {
      urgency: "CRITICAL",
      confidence: "97.5%",
      possibleCondition: {
        en: "Toxic Gas Inhalation & Severe Chemical Burns",
        ta: "நச்சு வாயு சுவாசம் மற்றும் ரசாயன தீக்காயங்கள்",
        hi: "विषाक्त गैस श्वसन और रासायनिक जलन"
      },
      symptoms: [
        { en: "Acute pulmonary edema risk from acrid fumes", ta: "நச்சுப் புகையினால் நுரையீரல் பாதிப்பு அபாயம்", hi: "फेफड़ों में गैस भरने का खतरा" },
        { en: "Partial-thickness chemical thermal burns", ta: "உடலில் ரசாயன தீக்காயங்கள்", hi: "रासायनिक जलन के घाव" },
        { en: "Unconscious casualties in hazard perimeter", ta: "ஆபத்தான பகுதியில் மயங்கி விழுந்தோர்", hi: "दुर्घटना स्थल पर बेहोश व्यक्ति" }
      ],
      aiReasoning: [
        { en: "HAZMAT containment + Burn ICU pre-alert triggered immediately", ta: "நச்சு வாயு தடுப்பு படை மற்றும் தீக்காய சிகிச்சை பிரிவு தயார் செய்யப்பட்டது" },
        { en: "Downwind evacuation perimeter calculated via meteorological wind feed", ta: "காற்றடிக்கும் திசையை கணித்து பொதுமக்கள் பாதுகாப்பு எச்சரிக்கை அனுப்பப்பட்டது" },
        { en: "Dual dispatch: Specialized HAZMAT Fire Tender + Advanced Life Support Burns Ambulance", ta: "தீயணைப்பு மற்றும் தீவிர தீக்காய சிகிச்சை ஆம்புலன்ஸ் இரண்டும் ஒரே நேரத்தில் ஒதுக்கீடு" }
      ]
    },
    fleet: {
      selectedUnit: "TN-FIRE-HAZMAT-01 + MEDIC-08",
      vehicleType: "HAZMAT Decon Unit + Dual Burns Ambulance",
      distance: "3.1 km",
      initialEtaSec: 360, // 6 min
      crew: "Divisional Fire Officer S. Arumugam + Hazmat Squad",
      equipment: "Chemical Suits (Level A), Foam Cannons, Neutralizing Mist, Bronchodilators",
      reasoning: {
        en: "Certified chemical decontamination unit equipped with neutralizing foam and specialized burn support.",
        ta: "ரசாயன தீயை அணைக்கும் நுரை பீரங்கி மற்றும் தீக்காய சிகிச்சை கருவிகள் கொண்ட சிறப்பு ஊர்தி.",
        hi: "रासायनिक आग बुझाने वाले फोम और बर्न केयर युक्त विशेष वाहन।"
      }
    },
    route: {
      polyline: [
        [13.2000, 80.3000],
        [13.2050, 80.3080],
        [13.2090, 80.3110],
        [13.2120, 80.3150]
      ],
      reroutedPolyline: [
        [13.2000, 80.3000],
        [13.2030, 80.3030],
        [13.2080, 80.3120],
        [13.2120, 80.3150]
      ],
      blockageNote: {
        en: "Main Port Road blocked by chemical smoke plume. Rerouted via Western Express Access Road (ETA saved: 1m 40s).",
        ta: "துறைமுக சாலையில் புகை மூட்டம் காரணமாக மேற்கு புறவழிப்பாதையில் வண்டி திருப்பி விடப்பட்டுள்ளது (1 நிமிடம் 40 விநாடி மிச்சம்).",
        hi: "मुख्य सड़क पर धुएं के कारण पश्चिमी बाईपास से नया रूट तैयार किया गया।"
      },
      signalsPreempted: 2,
      greenCorridorRoad: "Ennore Port Access Highway"
    },
    hospital: {
      name: "Government Stanley Medical College & Hospital (Stanley Burns Center)",
      tamilName: "ஸ்டான்லி அரசு மருத்துவக் கல்லூரி மற்றும் தீக்காய தீவிர சிகிச்சை மையம்",
      type: "Apex Government Plastic & Burn Care Specialty Hospital",
      distance: "8.5 km",
      eta: "13 min",
      bedsAvailable: 5,
      traumaBayReady: true,
      coords: [13.1070, 80.2870]
    },
    vitals: {
      hr: 128,
      spo2: "87%",
      bp: "140/92",
      gcs: "E3V3M5 (11/15)",
      rhythm: "Sinus Tachycardia"
    }
  },

  kavaraipettai_flood: {
    id: "SCN-TN-04",
    key: "kavaraipettai_flood",
    category: "catFlood",
    title: {
      en: "Tiruvallur / Kavaraipettai Subway Flash Flood Submersion",
      ta: "திருவள்ளூர் கவரைப்பேட்டை ரயில்வே சுரங்கப்பாதை வெள்ளம்",
      hi: "कवरैपेट्टई सबवे में बाढ़ में फंसा वाहन"
    },
    language: "ta",
    caller: {
      name: "கார்த்திக் (Karthik)",
      phone: "+91 97890 XXXXX",
      source: "SOS MOBILE / LOCATION",
      locationName: "ரயில்வே சுரங்கப்பாதை, கவரைப்பேட்டை (Railway Subway, Kavaraipettai)",
      landmark: "Near RMK Engineering College Arch, Kavaraipettai",
      district: "Tiruvallur (திருவள்ளூர்)",
      state: "Tamil Nadu (தமிழ்நாடு)",
      pin: "601206",
      coords: [13.3540, 80.1430]
    },
    voiceTranscript: [
      { speaker: "108 CAD", text: "கட்டுப்பாட்டு அறை, உங்கள் இருப்பிடத்தை கூறுங்கள்.", lang: "ta" },
      { speaker: "Caller", text: "கவரைப்பேட்டை ரயில்வே அண்டர்பாஸ்ல கார் சிக்கிக்கிச்சு! திடீர்னு தண்ணி 5 அடிக்கு மேல ஏறிடுச்சு!", lang: "ta" },
      { speaker: "108 CAD", text: "காரில் எத்தனை பேர் உள்ளீர்கள்? தண்ணீர் மட்டம் உயருகிறதா?", lang: "ta" },
      { speaker: "Caller", text: "நான், என் மனைவியும் குழந்தையும் காரின் கூரை மேல் ஏறி நிற்கிறோம்! நீரோட்டம் ரொம்ப வேகமா இருக்கு, காப்பாத்துங்க!", lang: "ta" }
    ],
    youSaidText: "கவரைப்பேட்டை ரயில்வே பாலத்தில் கார் நீரில் மூழ்கியது. கூரை மேல் குழந்தையுடன் நிற்கிறோம்.",
    weUnderstoodSummary: {
      en: "Rapid underpass basin water accumulation. Submerged vehicle with 3 occupants on roof threatened by torrential current.",
      ta: "சுரங்கப்பாதையில் திடீர் வெள்ளப்பெருக்கு, காரின் கூரை மேல் குழந்தையுடன் தவிக்கும் 3 குடும்பத்தினர்.",
      hi: "सबवे में अचानक जलभराव, कार की छत पर बच्चे के साथ फंसे 3 नागरिक।"
    },
    triage: {
      urgency: "HIGH",
      confidence: "98.8%",
      possibleCondition: {
        en: "Submersion / Drowning Threat & Acute Hypothermia",
        ta: "நீரில் மூழ்கும் ஆபத்து மற்றும் தீவிர உடல் நடுக்கம்",
        hi: "डूबने का खतरा और हाइपोथर्मिया"
      },
      symptoms: [
        { en: "Water level rising > 1.8 meters", ta: "தண்ணீர் மட்டம் 1.8 மீட்டருக்கு மேல் உயர்வு", hi: "जलस्तर 1.8 मीटर से ऊपर" },
        { en: "Infant exposure in high current", ta: "குழந்தைக்கு நீரோட்ட ஆபத்து", hi: "शिशु को तेज बहाव का खतरा" },
        { en: "Structural slippage risk of vehicle", ta: "வாகனம் அடித்துச் செல்லப்படும் அபாயம்", hi: "वाहन बह जाने का जोखिम" }
      ],
      aiReasoning: [
        { en: "Inflatable motorized water rescue raft + hypothermia warming kit dispatched", ta: "மோட்டார் மீட்பு படகு மற்றும் வெப்பமூட்டும் முதலுதவி குழு அனுப்பப்பட்டது" },
        { en: "National Disaster Response Force (NDRF Arakkonam) base alerted on standby", ta: "அரக்கோணம் தேசிய பேரிடர் மீட்புப் படைக்கு எச்சரிக்கை தகவல் பகிரப்பட்டது" }
      ]
    },
    fleet: {
      selectedUnit: "TN-DISASTER-WATER-03",
      vehicleType: "Swift Water Rescue Craft & Ambulance",
      distance: "2.1 km",
      initialEtaSec: 270, // 4.5 min
      crew: "Fire Rescue Sub-Officer Thangaraj + 3 Water Divers",
      equipment: "Rigid Inflatable Boat, Life Jackets, Thermal Blankets, Throw Lines",
      reasoning: {
        en: "Closest station holding certified flood rescue boat and trained scuba divers stationed at Gummidipoondi depot.",
        ta: "கும்மிடிப்பூண்டி தீயணைப்பு நிலையத்தில் உள்ள மீட்பு படகு மற்றும் பயிற்சி பெற்ற நீச்சல் வீரர்கள்.",
        hi: "गुम्मिडीपूंडी स्टेशन की बोट व प्रशिक्षित तैराक दल।"
      }
    },
    route: {
      polyline: [
        [13.3600, 80.1380],
        [13.3570, 80.1400],
        [13.3540, 80.1430]
      ],
      signalsPreempted: 1,
      greenCorridorRoad: "Kavaraipettai Bypass Elevated Road"
    },
    hospital: {
      name: "Government Medical College Hospital, Tiruvallur",
      tamilName: "அரசு மருத்துவக் கல்லூரி மருத்துவமனை, திருவள்ளூர்",
      type: "District Apex Hospital with Pediatric Emergency Unit",
      distance: "12.8 km",
      eta: "16 min",
      bedsAvailable: 8,
      traumaBayReady: true,
      coords: [13.1430, 79.9070]
    },
    vitals: {
      hr: 110,
      spo2: "96%",
      bp: "115/75",
      gcs: "E4V5M6 (15/15)",
      rhythm: "Normal Sinus with mild shivering artifacts"
    }
  },

  hindi_worker_cardiac: {
    id: "SCN-TN-05",
    key: "hindi_worker_cardiac",
    category: "catMedical",
    title: {
      en: "Hindi Worker Cardiac Event: Acute Chest Pain & Collapse",
      ta: "ஹிந்தி தொழிலாளி மாரடைப்பு (ஹிந்தி குரல் அவசரநிலை)",
      hi: "सीने में असहनीय दर्द व बेहोशी (हिंदी वॉइस इमरजेंसी)"
    },
    language: "hi",
    caller: {
      name: "अमित कुमार (Amit Kumar - Construction Supervisor)",
      phone: "+91 93600 XXXXX",
      source: "VOICE (हिन्दी)",
      locationName: "ओएमआर आईटी कॉरिडोर, शोलिंगनल्लूर (OMR IT Corridor, Sholinganallur)",
      landmark: "Near Elcot SEZ Main Gate, Sholinganallur",
      district: "Chennai (சென்னை)",
      state: "Tamil Nadu (தமிழ்நாடு)",
      pin: "600119",
      coords: [12.8988, 80.2281]
    },
    voiceTranscript: [
      { speaker: "108 CAD", text: "108 इमरजेंसी डिस्पैच, बताइए क्या सहायता चाहिए?", lang: "hi" },
      { speaker: "Caller", text: "सर! हमारे साथी अचानक गिर पड़े हैं! सीने में बहुत तेज दर्द बता रहे हैं और पसीना बह रहा है!", lang: "hi" },
      { speaker: "108 CAD", text: "क्या वे सांस ले पा रहे हैं? नब्ज चल रही है?", lang: "hi" },
      { speaker: "Caller", text: "सांस बहुत भारी है, बात नहीं कर पा रहे हैं। कृपया जल्दी एम्बुलेंस भेजिए!", lang: "hi" }
    ],
    youSaidText: "हमारे साथी गिर पड़े हैं, सीने में तेज दर्द है और बहुत पसीना आ रहा है।",
    weUnderstoodSummary: {
      en: "Acute coronary syndrome with radiating chest agony, diaphoresis, and impending cardiogenic collapse.",
      ta: "கடுமையான நெஞ்சுவலி, அதீத வியர்வை மற்றும் மாரடைப்புக்கான அறிகுறிகள்.",
      hi: "असहनीय सीने का दर्द, अत्यधिक पसीना और संभावित हार्ट अटैक की गंभीर स्थिति।"
    },
    triage: {
      urgency: "CRITICAL",
      confidence: "99.4%",
      possibleCondition: {
        en: "Acute ST-Elevation Myocardial Infarction (STEMI)",
        ta: "தீவிர மாரடைப்பு (STEMI Heart Attack)",
        hi: "तीव्र मायोकार्डियल इन्फार्कशन (हार्ट अटैक)"
      },
      symptoms: [
        { en: "Crushing retrosternal chest pain", ta: "நெஞ்சில் தாங்க முடியாத பாரம் மற்றும் வலி", hi: "सीने में तेज दबाव व दर्द" },
        { en: "Profuse cold diaphoresis", ta: "குளிர்ந்த வியர்வை கொட்டுதல்", hi: "ठंडा पसीना आना" },
        { en: "Radiation to left shoulder & jaw", ta: "இடது கை மற்றும் தாடை வரை வலி பரவுதல்", hi: "बाएं हाथ व जबड़े तक दर्द फैलना" }
      ],
      aiReasoning: [
        { en: "Cath-Lab priority code activated for primary PCI angioplasty window", ta: "ஆஞ்சியோபிளாஸ்டி செய்ய கேத் லேப் தயார் செய்ய எச்சரிக்கை அனுப்பப்பட்டது" },
        { en: "Pre-hospital 12-lead ECG transmission to on-duty interventional cardiologist", ta: "ஆம்புலன்ஸில் எடுக்கப்படும் இ.சி.ஜி இதய மருத்துவருக்கு உடனடியாக பகிரப்படும்" }
      ]
    },
    fleet: {
      selectedUnit: "TN-108-CARDIAC-02 (OMR)",
      vehicleType: "Cardiac ICU Ambulance with Tele-ECG",
      distance: "1.5 km",
      initialEtaSec: 210, // 3.5 min
      crew: "Dr. Sandeep (Emergency Care) + Nurse Preethi",
      equipment: "12-Lead ECG, Zoll Defibrillator, Aspirin/Clopidogrel Kit, Heparin",
      reasoning: {
        en: "Fastest cardiac resuscitation unit on OMR express corridor with live cardiology telemetry link.",
        ta: "ஓ.எம்.ஆர் சாலையில் உள்ள நேரடி இ.சி.ஜி இணைப்பு கொண்ட அதிவேக இதய தீவிர சிகிச்சை ஆம்புலன்ஸ்.",
        hi: "ओएमआर कॉरिडोर पर लाइव ईसीजी टेलीमेट्री से युक्त सबसे तेज कार्डियक एम्बुलेंस।"
      }
    },
    route: {
      polyline: [
        [12.9100, 80.2200],
        [12.9050, 80.2240],
        [12.8988, 80.2281],
        [12.8920, 80.2330]
      ],
      signalsPreempted: 3,
      greenCorridorRoad: "OMR Rajiv Gandhi IT Expressway"
    },
    hospital: {
      name: "Gleneagles Global Health City & Heart Institute",
      tamilName: "குளெனீகல்ஸ் குளோபல் இதய சிகிச்சை மருத்துவமனை (பெரும்பாக்கம்)",
      type: "24x7 Emergency Cardiac Interventional Center",
      distance: "4.2 km",
      eta: "7 min",
      bedsAvailable: 3,
      traumaBayReady: true,
      coords: [12.9010, 80.1980]
    },
    vitals: {
      hr: 116,
      spo2: "94%",
      bp: "100/62",
      gcs: "E4V4M6 (14/15)",
      rhythm: "Hyperacute T-Waves, Antero-lateral STEMI"
    }
  }
};
