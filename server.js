import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = ROOT;
const PORT = Number(process.env.PORT || 3000);

const OFFICIAL_SITE = 'https://gmiu.edu.in/gmiu/website/';
const ADMISSION_SITE = 'https://admission.gmiu.edu.in/';
const PHONE_1 = '+91 75749 49494';
const PHONE_2 = '+91 90999 51160';
const EMAIL = 'info@gmiu.edu.in';
const ADMISSION_EMAIL = 'admission@gmiu.edu.in';
const ADDRESS = 'Gyanmanjari Innovative University, Survey No. 30, Sidsar Road, Bhavnagar, Gujarat';

function normalize(input = '') {
  return String(input).toLowerCase().replace(/[^a-z0-9@.+\s-]/g, ' ').replace(/\s+/g, ' ').trim();
}

function hasWord(text, words) {
  return words.some((word) => new RegExp(`\\b${word}\\b`, 'i').test(text));
}

// This is intentionally a plain if / else if / else rule chain. No AI API,
// model, database, or machine-learning classifier is used anywhere in the flow.
export function getBotResponse(input) {
  const text = normalize(input);

  if (!text) {
    return 'Please type a question. Ask me about programs, admissions, campus life, facilities, placements, or contact details.';
  } else if (hasWord(text, ['hello', 'hi', 'hey', 'namaste'])) {
    return 'Hello! Welcome to the GMIU College Chatbot. What would you like to explore?';
  } else if (text.includes('thank') || text.includes('thanks')) {
    return 'You are welcome! For the latest official information, please visit the GMIU website.';
  } else if (text === 'bye' || text === 'goodbye' || text === 'good bye' || text === 'see you' || text === 'exit') {
    return 'Goodbye! Best wishes for your academic journey.';
  } else if ((text.includes('full form') || text.includes('stands for') || text.includes('meaning')) && text.includes('gmiu')) {
    return 'GMIU stands for Gyanmanjari Innovative University.';
  } else if (hasWord(text, ['vision', 'mission'])) {
    return 'GMIU’s vision is to be a globally recognized center of academic excellence that empowers students through value-embedded education, state-of-the-art learning, and future-ready skills. Its mission emphasizes multidisciplinary teaching and applied research, ethical leadership, innovation, civic responsibility, and societal value.';
  } else if (text.includes('what is gmiu') || text.includes('about gmiu') || text.includes('tell me about the college') || text === 'college') {
    return 'GMIU is Gyanmanjari Innovative University, a private university in Gujarat offering industry-aligned academic programs with its Proficient Learning Method (PLM).';
  } else if (text.includes('address') || text.includes('university address')) {
    return `The university address is: ${ADDRESS}.`;
  } else if (text.includes('where') && (text.includes('located') || text.includes('location') || text.includes('situated'))) {
    return `GMIU is located at ${ADDRESS}.`;
  } else if (text.includes('official website') || text === 'website' || text.includes('website link') || text === 'url') {
    return `The official website is ${OFFICIAL_SITE}`;
  } else if (text.includes('undergraduate') || text.includes('under graduation') || text.includes('ug program')) {
    return 'GMIU’s official undergraduate listing highlights 43 Engineering & Technology programs, along with undergraduate study across Computer Applications, Management, Science, Commerce, Arts, Design, Law, Pharmacy, and other institutes. See the current UG list at https://gmiu.edu.in/gmiu/website/ug/';
  } else if (text.includes('postgraduate') || text.includes('post graduation') || text.includes('pg program')) {
    return 'GMIU’s official postgraduate listing includes 11 Engineering & Technology programs, 2 Pharmacy programs, 13 Science programs, 4 Commerce programs, 23 Management programs, 9 Arts programs, 6 Computer Application programs, 2 Design programs, and additional Gyanmanjari Girls College programs. See https://gmiu.edu.in/gmiu/website/pg/';
  } else if (text.includes('diploma')) {
    return 'The official diploma catalog lists Institute of Engineering & Technology (18 programs), Institute of Design (3), Institute of Medical Science and Health Care (3), Institute of Hotel Management (1), and Gyanmanjari Girls College (2). Diploma examples include Computer, CSE, IT, Chemical, Electronics & Communication, Electrical, Mechanical, and Civil Engineering; most are 3 years. See https://gmiu.edu.in/gmiu/website/faculty/diploma/.';
  } else if (text.includes('phd') || text.includes('doctoral')) {
    return 'GMIU’s official PhD catalog lists Engineering, Science, Arts, Commerce, Management, and Computer Application programs. Each is shown as a minimum 3-year RLM program; listed intakes range from 2 to 5. See https://gmiu.edu.in/gmiu/website/faculty/phd/.';
  } else if (text.includes('certificate course') || text.includes('certificate program')) {
    return 'The official certificate catalog lists six 6-month RLM programs under Medical Science and Health Care: Operation Theatre Technology, ECG & TMT Technology, Echo Technology, Dialysis Technology, Hospital Billing and Insurance, and Cath Lab Technology. Each is shown with an intake of 30. See https://gmiu.edu.in/gmiu/website/cc/.';
  } else if (text.includes('pg diploma') || text.includes('post graduate diploma')) {
    return 'GMIU lists a 1-year PG Diploma in Medical Laboratory Technology under Medical Science and Health Care, with an intake of 60. See https://gmiu.edu.in/gmiu/website/faculty/pgd/.';
  } else if (text.includes('course') || text.includes('program') || text.includes('degree') || text.includes('study')) {
    return 'GMIU offers Diploma and Degree Engineering, Pharmacy, Science, Commerce, Management, Arts, Computer Applications, Design, and Law programs. Its official listings include both undergraduate and postgraduate options, with current details at https://gmiu.edu.in/gmiu/website/ug/ and https://gmiu.edu.in/gmiu/website/pg/.';
  } else if (text.includes('department') || text.includes('institute') || text.includes('faculty')) {
    return 'GMIU lists institutes for Engineering & Technology (Diploma and Degree), Pharmacy, Science, Commerce, Management, Arts, Computer Application, Design, and Law.';
  } else if (text.includes('how to apply') || text.includes('application process') || text.includes('application steps') || text.includes('apply process') || text.includes('steps to apply')) {
    return `The official application guide says to choose Admission 2026–27, click Register/Login, register or log in with mobile and password, select faculty, course level, learning method (PLM or Regular), and program. Then choose Online, Offline, or EMI payment, enter admission year and home district, click Pay Now, and download the Admission Fee Receipt. Start at ${ADMISSION_SITE}`;
  } else if (text.includes('after 10') || text.includes('after 12') || text.includes('b group') || text.includes('commerce eligibility')) {
    return 'GMIU provides separate admission guidance for After 10th, After 12th A/B Group, Commerce, GSEB, GUJCET, ACPDC, and ACPC through its Important Links page. Eligibility is program-specific; use the selected program page and confirm with admissions.';
  } else if ((text.includes('admission') || text.includes('apply') || text.includes('application') || text.includes('enrol')) && !text.includes('international admission') && !text.includes('foreign student') && !text.includes('student visa') && !text.includes('frro')) {
    return `Admissions for 2026–27 are open for a wide range of undergraduate and postgraduate programs. GMIU says its admission approach integrates NEP 2020 and PLM. Start at the GMIU admission portal: ${ADMISSION_SITE} You can also contact ${PHONE_1} or ${PHONE_2}.`;
  } else if (text.includes('eligib') || text.includes('qualif') || text.includes('requirement')) {
    return 'Eligibility depends on the selected course and previous qualification. One official B.IT example requires 10+2/equivalent in Science with Mathematics, Physics, and Chemistry and at least 50% aggregate. Treat this as a program-specific example and confirm the exact rule for your chosen course.';
  } else if (text.includes('fee') || text.includes('tuition') || text.includes('cost')) {
    return `Fees vary by program and admission category, so this chatbot does not guess a fee amount. Please check the current prospectus or admission portal, or contact ${PHONE_1} / ${PHONE_2} for the official fee structure.`;
  } else if (text.includes('mysy')) {
    return 'The official GMIU scholarship page describes MYSY as a Gujarat government initiative for economically weaker students domiciled in Gujarat. It lists eligibility of 80+ percentile in Class 10 or 12 and family income below Rs. 6 lakh per year, with documents such as income, caste, Aadhaar, marksheets, fee receipt, and self-declaration.';
  } else if (text.includes('vidya lakshmi') || text.includes('loan subsidy') || text.includes('interest subsidy')) {
    return 'GMIU’s official loan page directs applicants to register at https://www.vidyalakshmi.co.in. It describes a moratorium-period interest subsidy for eligible economically weaker students in recognized technical or professional courses in India; confirm current scheme rules with the bank and admission office.';
  } else if (hasWord(text, ['emi']) || text.includes('grayquest') || text.includes('bank loan') || text.includes('education loan')) {
    return 'GMIU says students can use GrayQuest to convert university fees into monthly EMI installments. Its admission support also facilitates education loans through SBI, HDFC, Bank of Baroda, and ICICI, including documentation and processing assistance.';
  } else if (text.includes('scholarship') || text.includes('financial aid') || text.includes('financial assistance')) {
    return 'GMIU offers merit-based and category-based scholarships, and meritorious students may receive free access to industry-recognized certificate programs. The official scholarship page also lists GrayQuest EMI, bank-loan support, and MYSY assistance; confirm current eligibility with admissions.';
  } else if (text.includes('hostel') || text.includes('accommodation')) {
    return 'GMIU describes dedicated hostel facilities for boys and girls. The boys’ hostel is near PM Awas, Hillpark Chokadi, and the girls’ hostel is near Gyanmanjari School, Kaliyabid, Bhavnagar. Rooms are described as spacious, well-ventilated, and designed for 5–6 students, with CCTV surveillance. Confirm availability and charges with admissions.';
  } else if (text.includes('transport') || text.includes('bus') || text.includes('travel')) {
    return 'GMIU reports 11+ modern buses with GPS tracking, connecting campus with pickup points across Bhavnagar city and surrounding areas at nominal fares. Routes are designed for students and staff, with professional drivers and adjusted examination-period schedules. Transport officer: Mr. Prakashbhai at +91 98253 32734.';
  } else if (text.includes('wifi') || text.includes('wi-fi') || text.includes('wi fi') || text.includes('internet campus')) {
    return 'GMIU’s Wi-Fi campus page states that campus Wi-Fi uses a 4 Mbps network standard and is available 24x7. It also mentions local-server content such as an e-library and laboratory software, plus FTP access.';
  } else if (text.includes('classroom') || text.includes('smart class') || text.includes('projector')) {
    return 'GMIU describes multimedia classrooms with ceiling-mounted projectors and screens connected to computers with internet access. Classrooms, drawing halls, workshops, and laboratories are described as spacious, air-conditioned, ventilated, and equipped for academic work.';
  } else if (text.includes('cafeteria') || text.includes('canteen') || text.includes('first aid') || text.includes('box cricket')) {
    return 'GMIU’s campus facilities include a cafeteria, first-aid provision, and box cricket. The cafeteria page says healthy food is provided for students and staff and emphasizes student safety; confirm current timings and availability with the university.';
  } else if (text.includes('360') || text.includes('virtual tour')) {
    return 'GMIU’s 360 tour lists campus areas such as the entrance, conference and seminar rooms, amphitheatre, special laboratories, language lab, iOS lab, computer center, classrooms, drawing halls, workshops, high-voltage lab, civil lab, machine lab, and computer labs. See https://gmiu.edu.in/gmiu/website/campus/360_virtual_tour.php.';
  } else if (text.includes('facility') || text.includes('infrastructure') || text.includes('campus')) {
    return 'GMIU highlights AI-enabled infrastructure, modern classrooms, advanced laboratories, a library, Wi-Fi campus, cafeteria and first-aid room, box cricket, transportation, expert faculty, and a strong learning environment. The official homepage reports 65+ laboratories and 300+ faculty members.';
  } else if (text.includes('library') || text.includes('books') || text.includes('reading')) {
    return 'GMIU’s Central Library reports more than 96,417 books, 50+ periodicals, 300+ bound journal volumes, and 400+ CDs/DVDs. It uses SOUL 3.0, barcode access, OPAC, DELNET membership, open access, reading halls, and internet. Hours are 8:00 a.m. to 6:00 p.m., Monday to Saturday.';
  } else if (text.includes('laborator') || text.includes(' lab')) {
    return 'GMIU reports 65+ laboratories across its academic ecosystem, supporting practical and applied learning. The exact laboratories depend on the institute and program.';
  } else if (text.includes('highest package') || text.includes('placement statistics') || text.includes('placement rate') || text.includes('how many companies')) {
    return 'The official GMIU admission placement page displays 561 companies visited, a 39L highest package, 909 placement offers, and a 92% placement rate. It also shows engineering passing-year figures for 2023–2026; verify the live page because placement metrics can change.';
  } else if (text.includes('geps') || text.includes('employability scale')) {
    return 'GMIU’s Gyanmanjari Employability Performance Scale (GEPS) card is issued to every student. It tracks academic performance, SDP, co-curricular and extracurricular activity, and technical/non-technical event participation; recruiters may use the GEPS database.';
  } else if (text.includes('industry visit') || text.includes('industrial visit')) {
    return 'GMIU’s industry-visit listing includes Adani Port Mundra, KTM Rajkot, BISAG, ISRO Ahmedabad, Agrocel Industries, GBRC Gandhinagar, Medinex Laboratories, Science City Gandhinagar, Amul Dairy Anand, Balaji Wafers Rajkot, Rishabh Software Vadodara, Tops Technologies, and a court visit.';
  } else if (text.includes('internship') || text.includes('pre placement')) {
    return 'GMIU’s official FAQ describes internships, live projects, industrial visits, industry training, aptitude tests, mock interviews, group discussions, resume building, communication skills, career counseling, and campus drives as placement preparation.';
  } else if (text.includes('placement') || text.includes('career') || text.includes('job')) {
    return 'GMIU describes its placement process as robust and transparent, with opportunities based on student eligibility and skills. It highlights a Training and Placement Cell, employability-focused preparation, internships, live projects, industrial exposure, and campus recruitment support.';
  } else if (text.includes('company') || text.includes('recruiter') || text.includes('visit campus')) {
    return 'Recruiters and placement drives can change each year. Please check the latest placement updates on the official GMIU website or contact the placement cell for a current company list.';
  } else if (text.includes('nss') || text.includes('national service') || text.includes('volunteer')) {
    return 'GMIU describes NSS as a voluntary student association focused on personality development through community service and campus–community linkage. Official examples include the Viksit Bharat @2047 Voice of Youth meeting, Triranga Yatra, Joy of Giving clothing drive, Bor Talav cleanliness campaign, and CPR/first-response workshop.';
  } else if (text.includes('volleyball') || text.includes('kho kho') || text.includes('badminton') || text.includes('sports tournament')) {
    return 'GMIU publishes sports activities including a 2025 volleyball tournament with 14 teams, a 2024 Kho-Kho tournament with 87 students in seven teams, and a 2025 badminton singles tournament with 12 participants. Sports details and schedules can change.';
  } else if (text.includes('expert talk') || text.includes('guest lecture')) {
    return 'GMIU lists expert-talk topics such as Energy Conservation, Industry Expectations and Professional Readiness, Code to Career with AI, Industrial Safety, Solar Trends, Data Analytics, GST, Entrepreneurship, Mental Wellness, LinkedIn, Pharmacology, and Pharmacognosy.';
  } else if (text.includes('extra') || text.includes('club') || text.includes('activity') || text.includes('sport') || text.includes('cultural')) {
    return 'Students can explore NSS, sports, cultural programs, Tech-Manjari, Kala-Manjari, Khel-Manjari, Ras-Manjari, expert talks, industry visits, project exhibitions, social activities, and innovation-oriented opportunities. Contact GMIU for the current activity calendar.';
  } else if (text.includes('rlm') || text.includes('regular learning')) {
    return 'GMIU’s comparison describes RLM as a regular, degree-focused learning system with semester-end exams and more theory emphasis. PLM is described as skill/application-focused with continuous assessment and less separation between theory and practical work.';
  } else if (text.includes('academic system') || text.includes('assessment') || text.includes('attendance') || text.includes('practical performance')) {
    return 'GMIU’s Academic System page lists 100% syllabus coverage, regular interval tests, attendance monitoring, class-work evaluation, individual practical-performance methodology, industrial visits, vocational training, expert lectures, English and communication skills, seminars, workshops, and interview preparation.';
  } else if (text.includes('plm') || text.includes('proficient learning')) {
    return 'PLM means Proficient Learning Method. GMIU presents it as an industry-ready, skill-based approach aligned with NEP 2020. An official B.Tech CSE PLM example lists project-based learning, real-time problem solving, AI, Data Science, software development, cybersecurity, and support from Research, International Relations, Startup, and Placement Cells.';
  } else if (text.includes('b tech') || text.includes('btech') || text.includes('computer science engineering')) {
    return 'The official GMIU B.Tech Computer Science Engineering PLM page describes a 4-year program with an annual intake of 40 seats. It covers AI, Data Science, software development, cybersecurity, project-based learning, and real-time problem solving. Verify the current fee and admission details on the program page.';
  } else if (text.includes('research grant') || text.includes('gmrdc') || text.includes('research infrastructure')) {
    return 'GMIU’s Research & Development Grant Cell describes support for equipment, materials, skilled personnel, laboratories, specialized equipment, and technology. Its research infrastructure page mentions laboratories, classrooms, a computer lab, a library, and expert-faculty mentorship.';
  } else if (text.includes('ssip') || text.includes('ipr') || text.includes('patent') || text.includes('incubat')) {
    return 'GMIU’s startup and SSIP pages describe design thinking, commercialization, technology- or knowledge-based startups, co-working spaces, testing labs, machinery, expert mentorship, seed-money loans, networking, and legal assistance. SSIP support includes proof-of-concepts, industrial design rights, patent registration, and mentorship.';
  } else if (text.includes('project exhibition') || text.includes('tech manjari')) {
    return 'GMIU’s project-exhibition listing names 2016 Enjinia, the 2017 Sustainable Energy Project Exhibition, Techmanjari 2020, and Pahel 2.0. The official page provides event names but limited descriptive text.';
  } else if (text.includes('research') || text.includes('innovation') || text.includes('startup')) {
    return 'GMIU highlights research grants, research infrastructure, a Research & Development Cell, startup incubation, SSIP/IPR support, an International Relations Cell, and placement-oriented innovation. See the linked official Research and Startup sections for current details.';
  } else if (text.includes('international admission') || text.includes('foreign student') || text.includes('student visa') || text.includes('frro')) {
    return 'GMIU’s international-admission page currently lists Bachelor in Pharmacy for international students. Applicants can apply online or email academic certificates to irc@gmiu.edu.in; after verification, GMIU issues a conditional/unconditional offer and then an acceptance or bonafide letter. Visa and FRRO rules should be confirmed with the IRC.';
  } else if (text.includes('international') || text.includes('study abroad') || text.includes('global exposure') || text.includes('irc')) {
    return 'GMIU’s International Relations Cell coordinates international engagement. Official options include full-semester and alternate-semester study, short cultural programs, international project/internship work, articulation pathways with credit transfer, and support for further-study applications.';
  } else if (text.includes('chancellor') || text.includes('vice chancellor') || text.includes('registrar') || text.includes('finance officer')) {
    return 'The official public-disclosure page lists Chancellor Mr. Avinashbhai B. Patel, Vice-Chancellor Dr. H.M. Nimbark, Registrar Dr. Nikunj N. Dave, and Finance Officer CA Dinesh A. Mangatramani. Verify current names and contact details on the official disclosure page.';
  } else if (text.includes('student') || text.includes('how many') || text.includes('strength')) {
    return 'The GMIU homepage reports that more than 3,000 students have placed their faith in the university.';
  } else if (text.includes('contact') || text.includes('phone') || text.includes('telephone') || text.includes('number')) {
    return `You can contact GMIU at ${PHONE_1} or ${PHONE_2}.`;
  } else if (text.includes('email') || text.includes('mail')) {
    return `The general email is ${EMAIL}. For admissions, you can also try ${ADMISSION_EMAIL}.`;
  } else if (text.includes('help') || text.includes('question') || text.includes('can you')) {
    return 'I can help with GMIU programs and catalogs, admissions and application steps, eligibility, fees, scholarships and loans, hostel, transport, campus and library facilities, PLM/RLM, academic system, placements, GEPS, research, startup support, international study, NSS, sports, leadership, contact details, and the official website.';
  } else {
    return 'Sorry, I do not understand that question yet. Try asking about programs, admissions, eligibility, fees, scholarships, facilities, placements, contact details, or the official website.';
  }
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.txt': 'text/plain; charset=utf-8'
};

function serveFile(response, pathname) {
  const requested = pathname === '/' ? '/index.html' : pathname;
  const safePath = path.normalize(requested).replace(/^([.][.][/\\])+/, '');
  const filePath = path.join(PUBLIC_DIR, safePath);
  if (!filePath.startsWith(PUBLIC_DIR)) { response.writeHead(403); response.end('Forbidden'); return; }
  fs.readFile(filePath, (error, content) => {
    if (error) { response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); response.end('Not found'); return; }
    const extension = path.extname(filePath);
    response.writeHead(200, { 'Content-Type': MIME_TYPES[extension] || 'application/octet-stream', 'Cache-Control': extension === '.html' ? 'no-cache' : 'public, max-age=3600' });
    response.end(content);
  });
}

const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url, `http://${request.headers.host || 'localhost'}`);
  if (request.method === 'GET' && requestUrl.pathname === '/health') {
    response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    response.end(JSON.stringify({ ok: true, service: 'gmiu-college-chatbot' }));
  } else if (request.method === 'POST' && requestUrl.pathname === '/api/chat') {
    let body = '';
    request.on('data', (chunk) => { body += chunk; if (body.length > 10000) request.destroy(); });
    request.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        if (typeof payload.message !== 'string') throw new Error('Message must be text.');
        response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        response.end(JSON.stringify({ reply: getBotResponse(payload.message) }));
      } catch (error) {
        response.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        response.end(JSON.stringify({ error: error.message || 'Invalid request.' }));
      }
    });
  } else if (request.method === 'GET') {
    serveFile(response, requestUrl.pathname);
  } else {
    response.writeHead(405, { Allow: 'GET, POST' }); response.end('Method not allowed');
  }
});

server.listen(PORT, '0.0.0.0', () => console.log(`GMIU College Chatbot listening on 0.0.0.0:${PORT}`));
