/* Healing Hearts Initiative – donation page
   No database or payment processing: the buttons only prepare a message. */

const WHATSAPP_NUMBER = "250783007675";
const DONATION_EMAIL = "healingheartsinitiative78@gmail.com";

/* ISO country : dialling code (used for the phone country-code list) */
const DIAL_CODES = "AF:93,AL:355,DZ:213,AD:376,AO:244,AG:1268,AR:54,AM:374,AW:297,AU:61,AT:43,AZ:994,BS:1242,BH:973,BD:880,BB:1246,BY:375,BE:32,BZ:501,BJ:229,BM:1441,BT:975,BO:591,BA:387,BW:267,BR:55,VG:1284,BN:673,BG:359,BF:226,BI:257,KH:855,CM:237,CA:1,CV:238,KY:1345,CF:236,TD:235,CL:56,CN:86,CO:57,KM:269,CG:242,CD:243,CR:506,CI:225,HR:385,CU:53,CW:599,CY:357,CZ:420,DK:45,DJ:253,DM:1767,DO:1809,EC:593,EG:20,SV:503,GQ:240,ER:291,EE:372,SZ:268,ET:251,FJ:679,FI:358,FR:33,GA:241,GM:220,GE:995,DE:49,GH:233,GR:30,GD:1473,GU:1671,GT:502,GN:224,GW:245,GY:592,HT:509,HN:504,HK:852,HU:36,IS:354,IN:91,ID:62,IR:98,IQ:964,IE:353,IL:972,IT:39,JM:1876,JP:81,JO:962,KZ:7,KE:254,KW:965,KG:996,LA:856,LV:371,LB:961,LS:266,LR:231,LY:218,LI:423,LT:370,LU:352,MO:853,MG:261,MW:265,MY:60,MV:960,ML:223,MT:356,MR:222,MU:230,MX:52,MD:373,MC:377,MN:976,ME:382,MS:1664,MA:212,MZ:258,MM:95,NA:264,NP:977,NL:31,NZ:64,NI:505,NE:227,NG:234,KP:850,MK:389,MP:1670,NO:47,OM:968,PK:92,PS:970,PA:507,PG:675,PY:595,PE:51,PH:63,PL:48,PT:351,PR:1787,QA:974,RO:40,RU:7,RW:250,KN:1869,LC:1758,VC:1784,SA:966,SN:221,RS:381,SC:248,SL:232,SG:65,SX:1721,SK:421,SI:386,SO:252,ZA:27,KR:82,SS:211,ES:34,LK:94,SD:249,SR:597,SE:46,CH:41,SY:963,TW:886,TJ:992,TZ:255,TH:66,TL:670,TG:228,TO:676,TT:1868,TN:216,TR:90,TM:993,TC:1649,UG:256,UA:380,AE:971,GB:44,US:1,VI:1340,UY:598,UZ:998,VU:678,VA:379,VE:58,VN:84,YE:967,ZM:260,ZW:263";

const COMMON_CURRENCIES = ["RWF", "USD", "EUR", "GBP", "KES", "UGX", "TZS", "BIF", "CDF", "ZAR", "NGN", "GHS", "CAD", "AUD", "AED", "CHF", "INR", "CNY", "JPY"];

const form = document.getElementById("donationForm");
const nameInput = document.getElementById("donorName");
const countrySelect = document.getElementById("donorCountry");
const phoneInput = document.getElementById("donorPhone");
const currencySelect = document.getElementById("donorCurrency");
const amountInput = document.getElementById("donorAmount");
const categorySelect = document.getElementById("donorCategory");
const messageInput = document.getElementById("donorMessage");
const formError = document.getElementById("formError");
const formStatus = document.getElementById("formStatus");
const emailButton = document.getElementById("emailButton");

function option(value, label) {
    const o = document.createElement("option");
    o.value = value;
    o.textContent = label;
    return o;
}

/* Currencies: every currency the browser knows, with the common ones first */
function fillCurrencies() {
    let all = COMMON_CURRENCIES;
    try { all = Intl.supportedValuesOf("currency"); } catch (e) { /* older browser: common list only */ }

    let label = function (code) { return code; };
    try {
        const names = new Intl.DisplayNames(["en"], { type: "currency" });
        label = function (code) { return code + " – " + names.of(code); };
    } catch (e) { /* codes only */ }

    const common = document.createElement("optgroup");
    common.label = "Common";
    COMMON_CURRENCIES.forEach(function (c) { common.append(option(c, label(c))); });

    const rest = document.createElement("optgroup");
    rest.label = "All currencies";
    all.filter(function (c) { return !COMMON_CURRENCIES.includes(c); })
       .forEach(function (c) { rest.append(option(c, label(c))); });

    currencySelect.append(common, rest);
    currencySelect.value = "RWF";
}

/* Country codes, sorted by country name, Rwanda preselected */
function fillCountries() {
    let regionName = function (iso) { return iso; };
    try {
        const names = new Intl.DisplayNames(["en"], { type: "region" });
        regionName = function (iso) { return names.of(iso); };
    } catch (e) { /* ISO codes only */ }

    DIAL_CODES.split(",").map(function (pair) {
        const p = pair.split(":");
        return { iso: p[0], dial: p[1], name: regionName(p[0]) };
    }).sort(function (a, b) { return a.name.localeCompare(b.name); })
      .forEach(function (c) {
          const o = option(c.dial, c.name + " (+" + c.dial + ")");
          o.dataset.iso = c.iso;
          o.dataset.short = "+" + c.dial;
          countrySelect.append(o);
      });

    countrySelect.value = "250";
    const rwanda = Array.from(countrySelect.options).find(function (o) { return o.dataset.iso === "RW"; });
    if (rwanda) rwanda.selected = true;
}

/* How many decimals this currency uses (RWF 0, USD 2, KWD 3) */
function currencyDigits() {
    try {
        return new Intl.NumberFormat("en", { style: "currency", currency: currencySelect.value })
            .resolvedOptions().maximumFractionDigits;
    } catch (e) { return 2; }
}

function showError(text, field) {
    formStatus.textContent = "";
    formError.textContent = text;
    field.setAttribute("aria-invalid", "true");
    field.focus();
}

function clearErrors() {
    formError.textContent = "";
    [amountInput, phoneInput].forEach(function (f) { f.removeAttribute("aria-invalid"); });
}

/* Returns the phone as +<code><number>, "" if left empty, or null if invalid */
function readPhone() {
    const raw = phoneInput.value.trim();
    if (!raw) return "";
    const digits = raw.replace(/\D/g, "");
    const international = raw.startsWith("+");
    const national = digits.replace(/^0+/, "");
    if (digits.length < 6 || digits.length > 15) return null;
    return international ? "+" + digits : "+" + countrySelect.value + national;
}

/* Returns the message text, or null if something needs fixing */
function buildDonationMessage() {
    const amount = Number(amountInput.value);
    const digits = currencyDigits();
    const scaled = amount * Math.pow(10, digits);
    const validAmount = Number.isFinite(amount) && amount > 0 && Math.abs(scaled - Math.round(scaled)) < 1e-6;

    if (!validAmount) {
        showError(digits === 0
            ? "Please enter a whole amount greater than zero. " + currencySelect.value + " has no decimals."
            : "Please enter an amount greater than zero, with up to " + digits + " decimal places.", amountInput);
        return null;
    }

    const phone = readPhone();
    if (phone === null) {
        showError("That phone number doesn't look right. Check the country code and number, or leave it blank.", phoneInput);
        return null;
    }

    clearErrors();
    const donorName = nameInput.value.trim();
    const extra = messageInput.value.trim();

    return [
        "Hello Healing Hearts Initiative,",
        "I'd like to support your work with a donation.",
        "Amount: " + amount.toLocaleString("en-US", { maximumFractionDigits: digits }) + " " + currencySelect.value,
        "category: " + categorySelect.value,
        donorName ? "Name: " + donorName : "",
        phone ? "Phone: " + phone : "",
        extra ? "Message: " + extra : "",
        "Could you please guide me on how to send it? Thank you."
    ].filter(Boolean).join("\n");
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const message = buildDonationMessage();
    if (!message) return;

    window.open(
        "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message),
        "_blank", "noopener,noreferrer"
    );
    formStatus.textContent = "Your message is ready. Press send in WhatsApp to reach us.";
});

/* Opens a Gmail compose window with the message already written */
emailButton.addEventListener("click", function () {
    const message = buildDonationMessage();
    if (!message) return;

    const gmailURL = "https://mail.google.com/mail/?view=cm&fs=1" +
        "&to=" + encodeURIComponent(DONATION_EMAIL) +
        "&su=" + encodeURIComponent("Donation to Healing Hearts Initiative") +
        "&body=" + encodeURIComponent(message);

    window.open(gmailURL, "_blank", "noopener,noreferrer");
    formStatus.textContent = "Your Gmail message is ready. Press send in Gmail to reach us.";
});

[amountInput, phoneInput, currencySelect, countrySelect].forEach(function (f) {
    f.addEventListener("input", clearErrors);
});

fillCurrencies();
fillCountries();

/* Mobile navigation */
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

function setMenu(open) {
    mainNav.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    menuToggle.firstElementChild.className = open ? "ri-close-line" : "ri-menu-line";
}

if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
        setMenu(!mainNav.classList.contains("open"));
    });
    mainNav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () { setMenu(false); });
    });
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && mainNav.classList.contains("open")) {
            setMenu(false);
            menuToggle.focus();
        }
    });
    window.addEventListener("resize", function () {
        if (window.innerWidth > 900) setMenu(false);
    });
}

const currentYear = document.getElementById("currentYear");
if (currentYear) currentYear.textContent = new Date().getFullYear();