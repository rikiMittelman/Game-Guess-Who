let mainCard;//כרטיס ראשי
//התחלת המשחק
function mainJS() {
    ////////////////////////////////ניסיון לעלות לגיט אב
    HowToGame();
    userForm();
}
function HowToGame() {

    const BGHowToGame = document.createElement("div");//לוח הוראות המשחק
    BGHowToGame.setAttribute("id", "BGHowToGame");

    const HowToGame = document.createElement("div");//הוראות המשחק
    HowToGame.setAttribute("id", "HowToGame");

    const h3 = document.createElement("h3");
    h3.innerHTML = "הוראות המשחק:";//כתיבת ההוראות
    h3.setAttribute("id", "h3HowToGame");

    const p1 = document.createElement("p");
    p1.innerHTML = " במשחק הנפלא, משחק 'מי ומי', עליך לגלות מיהו הדמות שנבחרה.";
    const p2 = document.createElement("p");
    p2.innerHTML = "כיצד מגלים?"
    const p3 = document.createElement("p");
    p3.innerText = "עליך לבחור בשאלה מתוך השאלות המוצגות לפניך, עפ''י הקטגוריה המתאימה לשאלה."
    const p4 = document.createElement("p");
    p4.innerHTML = "?לדוגמא בקטגוריה 'מין' ישנן 2 שאלות שביכלתך לשאול: 1.'האם אני בן?', 2.'האם אני בת?'.";
    const p45 = document.createElement("p");
    p45.innerHTML = " אם הדמות שנבחרה היא בן, כל הכרטיסים של הבנות נהפכות וכן להפך"

    const p5 = document.createElement("p");
    p5.innerHTML = "שים/י לב: מספר השאלות שביכולתך לשאול הינה מוגבלת!!";

    const p6 = document.createElement("p");
    p6.innerHTML = "אנא בחר/י את השאלות ברצינות ולאחר חשיבה מעמיקה.";

    const close = document.createElement("input");//בנית כפתור לסגירת הוראות המשחק
    close.setAttribute("id", "closeHowToGame");
    close.setAttribute("type", "button");
    close.setAttribute("value", "x");
    close.addEventListener("click", () => { BGHowToGame.style.display = "none"; });//הופך את הוראות המשחק לבילתי נראה
    HowToGame.appendChild(h3);//שם את כל ההוראות בתוך לוח ההוראות
    HowToGame.appendChild(p1);
    HowToGame.appendChild(p2);
    HowToGame.appendChild(p3);
    HowToGame.appendChild(p4);
    HowToGame.appendChild(p45);
    HowToGame.appendChild(p5);
    HowToGame.appendChild(p6);
    HowToGame.appendChild(close);
    BGHowToGame.appendChild(HowToGame);
    BGHowToGame.style.display = "none";//הוראות המשחק נהיו בלתי נראות

    document.getElementById("body").appendChild(BGHowToGame);
}
function userForm() {
    //טופס התחלתי למילוי שם משתמש וסיסמא
    const form = document.createElement("form")
    form.setAttribute("id", "form");

    const p = document.createElement("p")
    p.innerHTML = "הכנס שם משתמש וסיסמה:";

    const inputName = document.createElement("input")
    inputName.setAttribute("id", "inputName");
    inputName.setAttribute("type", "text");
    inputName.setAttribute("class", "userInput");
    inputName.setAttribute("placeholder", "שם");
    inputName.setAttribute("required", "required");

    const inputLastName = document.createElement("input");
    inputLastName.setAttribute("id", "inputLastName");
    inputLastName.setAttribute("type", "text");
    inputLastName.setAttribute("class", "userInput");
    inputLastName.setAttribute("placeholder", "משפחה");
    inputLastName.setAttribute("required", "required");

    const inputCode = document.createElement("input");
    inputCode.setAttribute("id", "inputCode");
    inputCode.setAttribute("type", "password");
    inputCode.setAttribute("class", "userInput");
    inputCode.setAttribute("placeholder", "סיסמא");
    inputCode.setAttribute("required", "required");

    const notValid = document.createElement("p");
    notValid.setAttribute("id", "notValid");
    notValid.innerHTML = "";

    const submitForm = document.createElement("input");
    submitForm.setAttribute("id", "submitForm");
    submitForm.setAttribute("type", "button");
    submitForm.setAttribute("class", "userInput");
    submitForm.setAttribute("value", "שליחה");
    submitForm.addEventListener("click", userPlay);

    const br = document.createElement("br");

    form.appendChild(p);
    form.appendChild(inputName);
    form.appendChild(inputLastName);
    form.appendChild(inputCode);
    form.appendChild(notValid);
    form.appendChild(submitForm);
    document.getElementById("body").appendChild(form);
}
var user;
function userPlay() {
    //הגדרת המשתמש
    user = {
        name: document.getElementById("inputName").value,
        family: document.getElementById("inputLastName").value,
        password: document.getElementById("inputCode").value,
        core: 0,
        countGames: 0,
        countwin: 0
    };
    let userStr = JSON.stringify(user);//המרת אוביקט של גאווהקריפט ל JSON 

    let checkUser = localStorage.getItem(user.name + " " + user.family);
    //במקרה שעדיין לא הוגדר שם משתמש וסיסמא אז תכניס לי
    if (checkUser == undefined) {
        localStorage.setItem(user.name + " " + user.family, userStr);
        document.getElementById("form").remove();
        chooseLevel();
    }
    else {
        let checkUserCode = JSON.parse(checkUser).password;
        if (checkUserCode != document.getElementById("inputCode").value) {
            document.getElementById("notValid").innerHTML = "*קוד לא תקין";
            playAudio("fail");
        }
        else {
            user = JSON.parse(checkUser);
            document.getElementById("form").remove();
            chooseLevel();
        }
    }
}

function chooseLevel() {
    const cLevel = document.createElement("form");
    cLevel.setAttribute("name", "levels");
    cLevel.setAttribute("id", "levels");
    const h2 = document.createElement("h2");
    h2.innerHTML = user.name + " " + user.family + ", בחר/י את רמת המשחק הרצויה:";

    const radio1 = document.createElement("input");
    radio1.setAttribute("type", "radio");
    radio1.setAttribute("name", "level");
    radio1.setAttribute("class", "level");
    radio1.setAttribute("checked", "checked");

    const p1 = document.createElement("p");
    p1.innerHTML = "מתחילים";

    const radio2 = document.createElement("input");
    radio2.setAttribute("type", "radio");
    radio2.setAttribute("name", "level");
    radio2.setAttribute("class", "level");

    const p2 = document.createElement("p");
    p2.innerHTML = "מתקדמים";

    const br = document.createElement("br");

    const choose = document.createElement("input");
    choose.setAttribute("type", "button");
    choose.setAttribute("value", "התחל");
    choose.setAttribute("class", "userInput");
    choose.addEventListener("click", () => { playAudio("click"); start(); });

    const bHowToGame = document.createElement("input");
    bHowToGame.setAttribute("type", "button");
    bHowToGame.setAttribute("value", "הוראות המשחק");
    bHowToGame.setAttribute("class", "userInput");
    bHowToGame.addEventListener("click", () => { document.getElementById("BGHowToGame").style.display = "block"; });

    cLevel.appendChild(h2);
    cLevel.appendChild(radio1);
    cLevel.appendChild(p1);
    cLevel.appendChild(br);
    cLevel.appendChild(radio2);
    cLevel.appendChild(p2);
    cLevel.appendChild(br);
    cLevel.appendChild(br);
    cLevel.appendChild(choose);
    cLevel.appendChild(br);
    cLevel.appendChild(bHowToGame);

    document.getElementById("body").appendChild(cLevel);
}

//יצירת אוביקט מסוג people
class People {
    constructor(image, name, category, hairColor, glasses, hat, beard, items) {
        this.image = image;
        this.name = name;
        this.category = category;
        this.hairColor = hairColor;
        this.glasses = glasses;
        this.hat = hat;
        this.beard = beard;
        this.items = items;
    }
}
var people = [];

let amount; //כמות הדמויות במשחק
let cardArr = []; //מערך הדמויות

//פונקצית התחלת המשחק
function start() {
    user.countGames++;
    userStr = JSON.stringify(user);
    localStorage.setItem(user.name + " " + user.family, userStr);
    people = [
        new People("1.jpg", "יוסף", "בן", "ג'ינג'י", "יש", "כיפה", "אין", "חולצת צווארון"),
        new People("2.jpg", "יהודה", "בן", "חום", "יש", "כובע", "אין", "חולצת צווארון"),
        new People("3.jpg", "ריקי", "בת", "חום", "יש", "סרט", "אין", "נמשים"),
        new People("4.jpg", "בת שבע", "בת", "ג'ינג'י", "אין", "סרט", "אין", "תלתלים"),
        new People("5.jpg", "רותי", "בת", "חום", "יש", "אין", "אין", "חולצת צווארון"),
        new People("6.jpg", "גבריאל", "בן", "שחור", "יש", "כובע", "יש", "חולצת צווארון"),
        new People("7.jpg", "מטילדה", "בת", "לבן", "יש", "כובע", "אין", "פרח על המטפחת"),
        new People("8.jpg", "שפרה", "בת", "לא ידוע", "יש", "מטפחת", "אין", "סינר"),
        new People("9.jpg", "מנחם", "בן", "בלונדיני", "יש", "כיפה", "אין", "חולצת צווארון"),
        new People("10.jpg", "שרה מרים", "בת", "לא ידוע", "אין", "מטפחת", "אין", "פרח על המטפחת"),
        new People("11.jpg", "אלי", "בן", "בלונדיני", "אין", "אין", "אין", "מוצץ"),
        new People("12.jpg", "חנן", "בן", "שחור", "אין", "כיפה", "אין", "תלתלים"),
        new People("13.jpg", "יוטא", "בת", "לא ידוע", "יש", "מטפחת", "אין", "שרשרת"),
        new People("14.jpg", "שלום", "בן", "שחור", "אין", "כיפה", "יש", "חולצת צווארון"),
        new People("15.jpg", "מיכל", "בת", "חום", "אין", "כתר", "אין", "תלתלים"),
        new People("16.jpg", "אלימלך", "בן", "לבן", "אין", "שטריימל", "יש", "קישוטים על הקיטל"),
        new People("17.jpg", "גולדה", "בת", "לא ידוע", "יש", "מטפחת", "אין", "חולצת צווארון"),
        new People("18.jpg", "יפית", "בת", "חום", "אין", "כובע", "אין", "שרשרת"),
        new People("19.jpg", "ישראל", "בן", "ג'ינג'י", "אין", "טלית", "יש", "תפילין"),
        new People("20.jpg", "אילה", "בת", "בלונדיני", "אין", "אין", "אין", "חולצת צווארון"),
        new People("21.jpg", "ג'ייקוב", "בן", "חום", "יש", "כיפה", "יש", "חולצת צווארון"),
        new People("22.jpg", "יעקב מנחם", "בן", "אפור", "יש", "כובע", "יש", "חולצת צווארון"),
        new People("23.jpg", "בנימין", "בן", "חום", "אין", "כיפה", "אין", "חולצת צווארון"),
        new People("24.jpg", "יעלי", "בת", "לא ידוע", "אין", "כובע", "אין", "פונפונים בכובע")
    ]
    let main = document.createElement("main");
    main.setAttribute("id", "main");
    document.getElementById("body").appendChild(main);

    let div = document.createElement("div");
    div.setAttribute("id", "pictures");
    let b;
    if (document.levels.level[0].checked == true)
        amount = 18;
    else
        amount = 24;

    document.getElementById("levels").remove();

    let k = 0;//אינדקס למילוי מערך הדמויות
    for (let j = 0; j < amount / 6; j++) {
        for (let i = 0; i < 6; i++) {
            cardArr[k] = createCards(people[k]);
            div.appendChild(cardArr[k++]);
        }
        b = document.createElement("br");
        div.appendChild(b);
    }
    main.appendChild(div);
    questionsNav();
    buttons();
    chooseRandomImg();
}
let randCard; //הכרטיס המוגרל
//בחירת אוביקט בצורה רנדומלית
function chooseRandomImg() {
    const rand = Math.floor(Math.random() * amount);
    randCard = people[rand];
}
//פונקציה המייצרת את כרטיסי המשחק - תמונה + השם של כל אוביקט
function createCards(person) {
    const div = document.createElement("div");
    div.classList.add("card");

    div.onclick = () => { question(person); playAudio("check"); };
    const nameP = document.createElement("p");
    if (person.name != null) {
        nameP.innerHTML = person.name;
    }
    const imgP = document.createElement("img");
    // imgP.src=images/person.image;
    imgP.src = `images/${person.image}`;
    div.appendChild(imgP);
    div.appendChild(nameP);
    return div;
}
questionCategories = ["מין", "צבע שיער", "משקפיים", "כיסוי ראש", "זקן", "פריטים נוספים"];
questionCategories2 = ["category", "hairColor", "glasses", "hat", "beard", "items"];
questionsArr = [["האם אני בן?", "האם אני בת?"],
["האם שערי שחור?", "האם שערי לבן?", "האם שערי חום?", "האם שערי בלונדיני?", "האם שערי ג'ינג'י?", "האם שערי אפור?", "האם צבע שערי לא ידוע?"],
["האם יש לי משקפיים?", "האם אין לי משקפיים?"],
["האם יש לי כובע?", "האם יש לי כיפה?", "האם יש לי סרט?", "האם אין לי כיסוי?", "האם יש לי טלית?", "האם יש לי שטריימל?", "האם יש לי מטפחת?"],
["האם יש לי זקן?", "האם אין לי זקן?"],
["האם יש לי חולצת צווארון?", "האם יש לי נמשים?", "האם יש לי תלתלים?", "האם יש לי פרח על המטפחת?", "האם יש לי סינר?", "האם יש לי מוצץ?", "האם יש לי שרשרת?", "האם יש לי קישוטים על הקיטל?", "האם יש לי תפילין?", "האם יש לי פונפונים בכובע?"]];
questionsArr2 = [["בן", "בת"],
["שחור", "לבן", "חום", "בלונדיני", "ג'ינג'י", "אפור", "לא ידוע"],
["יש", "אין"],
["כובע", "כיפה", "סרט", "אין", "טלית", "שטריימל", "מטפחת"],
["יש", "אין"],
["חולצת צווארון", "נמשים", "תלתלים", "פרח על המטפחת", "סינר", "מוצץ", "שרשרת", "קישוטים על הקיטל", "תפילין", "פונפונים בכובע"]];

let tryings = 0; //מס' הנסיונות

//פונקציה של לחיצת שאני רוצה לנחש את האוביקט הזה
function question(person) {
    //בדיקה אם התמונה כבר הפוכה
    if (person.image == "0.jpg")
        return;
    const questionCard = document.createElement("div");
    questionCard.setAttribute("id", "questionCard");
    //ניחוש
    const guess = document.createElement("input");
    guess.setAttribute("type", "button");
    guess.setAttribute("id", "guessButton")
    guess.setAttribute("value", "אני רוצה לנחש שזה " + person.name + " ");
    guess.addEventListener("click", () => { playAudio("SQUEAK2"); IGuess(person.name); questionCard.remove(); });
    //סגירת ההודעה של הניחוש
    const close = document.createElement("button");
    close.setAttribute("id", "close");
    close.innerHTML = "x";
    close.addEventListener("click", () => { questionCard.remove(); });

    questionCard.appendChild(guess);
    questionCard.appendChild(close);

    document.getElementById("body").appendChild(questionCard);
}
//פונקציה של בדיקת הניחוש אם הוא תואם לשם של התמונה הנבחרת
function IGuess(name) {
    if (randCard.name == name) {
        playAudio("WOW");
        message("ניצחת!!");//שליחה לפונקציה הודעה
        user.countwin++;//מספר ניצחונות
        userStr = JSON.stringify(user);
        localStorage.setItem(user.name + " " + user.family, userStr);
    }
    else {
        message("הניחוש נכשל!!")
        playAudio("wrong");
    }
}
//פונקציה של הודעת הניחוש
function message(m) {
    let messageDiv = document.createElement("div");
    messageDiv.setAttribute("id", "messageDiv");
    document.getElementById("main").remove();
    let message = document.createElement("h1");
    message.setAttribute("id", "messageGuess");
    message.innerHTML = m;//הצגת ההודעה
    messageDiv.appendChild(message);
    document.getElementById("body").appendChild(messageDiv);
    let startAgain = document.createElement("button");//כפתור של שחק שוב
    startAgain.setAttribute("id", "startAgain");
    startAgain.innerHTML = "שחק שוב"
    messageDiv.appendChild(startAgain);
    startAgain.addEventListener("click", () => { playAudio("click"); lastGame(); });
    let exit = document.createElement("button");//כפתור של יציאה מהמשחק
    exit.innerHTML = "exit";
    exit.setAttribute("id", "exit");
    messageDiv.appendChild(exit);
    exit.addEventListener("click", () => { playAudio("click"); window.close(); });
}
//פונקציה שנשלחת מהפונקציה flipCard לבדוק האם הכמות נסיונות נגמרו ואז נגמר המשחק
// let x= (tryings)=>{
//     return tryings>=4?true:false;
// }
function flipCard(category, value) {//כשהמשתמש לחץ על שאלה נוספת
    if (tryings >= 4) {//אם כבר שאל ארבע שאלות השחקן נכשל
        playAudio("HANG_UP");//שמע של כישלון
        message("!!!Game over");//הודעת כישלון
    }
    tryings++;
    document.getElementById("yourTryings").innerHTML = user.name + "נשארו לך עוד " + (4 - tryings) + " נסיונות";
    const iconImg = new People("0.jpg", null, null, null, null, null);
    for (let i = 0; i < amount; i++) {
        if (people[i][category] != randCard[category] && (randCard[category] == value || people[i][category] == value))
            people[i] = iconImg;
    }
    //מחיקת התמונות המוצגות והדפסתן שוב אחרי שחלק מהתמונות כוסו
    document.getElementById("pictures").remove();
    const pictures = document.createElement("div");
    pictures.setAttribute("id", "pictures");
    document.getElementById("main").appendChild(pictures);
    let k = 0;
    for (let j = 0; j < amount / 6; j++) {
        for (let i = 0; i < 6; i++) {
            cardArr[k] = createCards(people[k]);
            document.getElementById("pictures").appendChild(cardArr[k++]);
        }
        b = document.createElement("br");
        document.getElementById("pictures").appendChild(b);
    }
}
function buttons() {

    const theQuestion = document.getElementsByClassName("buttonsQuestion");

    for (let i = 0; i < theQuestion.length; i++) {
        theQuestion[i].addEventListener("click", function () {
            this.classList.toggle("active");//פותח את הכפתור של השאלה
            let panel = this.nextElementSibling;//תשובה נוספת באותה שאלה
            if (panel.style.display === "block") {
                panel.style.display = "none";
            }
            else {
                panel.style.display = "block";
            }
        });
    }
}
//פונקציה כוללת של השאלות ותשובות השאלות
function questionsNav() {
    const d = document.createElement("p");
    d.setAttribute("id", "questionsNav");

    const yourTryings = document.createElement("p");
    yourTryings.setAttribute("id", "yourTryings");
    yourTryings.innerHTML = user.name + " יש לך 4 נסיונות לשאלות ";

    d.appendChild(yourTryings);
    //הלולאה הראשונה עוברת על כל הקטגוריות ומקצה לכל אחד שם אחר
    for (let i = 0; i < questionCategories.length; i++) {
        let div2 = document.createElement("div");
        div2.setAttribute("class", "outerDiv");

        let subDiv = document.createElement("div");
        subDiv.setAttribute("id", "question" + `${i + 1}`);
        subDiv.setAttribute("class", "questions");
        div2.appendChild(subDiv);
        //כפתור קטגוריה
        const b = document.createElement("button");
        b.innerHTML = questionCategories[i];
        b.setAttribute("class", "buttonsQuestion");
        //הלולאה השניה מקצה לכל קטגוריה שאלות
        for (let j = 0; j < questionsArr[i].length; j++) {
            let subButton = document.createElement("button");
            subButton.innerHTML = questionsArr[i][j];//השמה של השאלות בתוך הקטגוריה
            subButton.addEventListener("click", () => {
                playAudio("click");
                flipCard(`${questionCategories2[i]}`, `${questionsArr2[i][j]}`);//שולח לפונקציה של הפיכת קלפים קטגוריה וערכים
                b.nextElementSibling.style.display = "none";
                subButton.setAttribute("disabled", "disabled");
            });//שאלה שכבר לחצו עליה נחסמת לשימוש נוסף
            subButton.setAttribute("class", "subButton");
            subDiv.appendChild(subButton);
        }
        d.appendChild(b);
        d.appendChild(div2);
    }

    document.getElementById("main").appendChild(d);
}

//פונקציה של סיום המשחק ושליחה מחודשת לבחירת רמה
function lastGame() {
    messageDiv.remove();
    cardArr = [];
    tryings = 0;
    people = [];
    mainCard = null;
    setTimeout("chooseLevel()", 50);
}
//ID-פונקציה שמפעילה את הצליל בהתאם ל
function playAudio(audioId) {
    let audio = document.getElementById(audioId);
    audio.play();
}
