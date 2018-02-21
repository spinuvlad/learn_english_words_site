var strWords = 'already deja уже with cu с know cunoaste знать other alt другой may putea может can putea может majority majoritatea большинство overwhelming dominant подавляющий make face делать ubiquitous omniprezent повсеместный that care чтобы must trebuie должен specify specifica указывать content continut содержание behavior comportament поведение';

var header = document.getElementById('header');

var viewWords = document.getElementById('view-words');

var showAllWords = document.getElementById('show-all-words');

var hideBlock = document.getElementById('hide-block');

var activeBlock = document.getElementById('active-block');

var numMax = document.getElementById('num-max');

var enterNum = document.getElementById('enter-num');

var changeLang = document.getElementById('change-lang');

var innerLang = document.getElementById('inner-lang');

var direction = document.getElementById('direction');

var innerDirection = document.getElementById('inner-direction');

var push = document.getElementById('push-words');

var pushAll = document.getElementById('push-all-words');

var help = document.getElementById('help');

var refresh = document.getElementById('refresh');

var pushElem = document.getElementById('push-elements');

var arrWords = randomArrElements(groupArr(strWords.split(' '), 3));

var j, numFloat, allInputsResult, prime = 0,
    next = 1;

var arrResult = [];
showAllWords.style.display = 'none';
numMax.innerHTML = arrWords.length;
pushAll.value += ' ' + arrWords.length + ' words'

enterNum.addEventListener('mouseout', pushNumInPushButton);
push.addEventListener('click', pushButton);
pushAll.addEventListener('click', pushButtonAll);
refresh.addEventListener('click', refreshDoc);
changeLang.addEventListener('click', togglePosition);
direction.addEventListener('click', togglePosition);
viewWords.addEventListener('click', viewAllWordsInTable);

function viewAllWordsInTable(){
  header.style.display = 'none';
  showAllWords.style.display = 'inline-block';
  hideBlock.style.display = 'block';
  help.style.display = 'none';
  hideBlock.addEventListener('click', showHideBlockStart);
  
   var tr = document.createElement('tr');
    var firstTh = document.createElement('th');
    var secondTh = document.createElement('th');
    var lastTh = document.createElement('th');
    
    firstTh.innerHTML = 'En'
    secondTh.innerHTML = 'Ro'
    lastTh.innerHTML = 'Ru'
    
    tr.appendChild(firstTh);
    tr.appendChild(secondTh);
    tr.appendChild(lastTh);
    showAllWords.appendChild(tr);
  
  for (var i = 0; i < arrWords.length; i++){
    var tr = document.createElement('tr');
    var firstTd = document.createElement('td');
    var secondTd = document.createElement('td');
    var lastTd = document.createElement('td');
    
    firstTd.innerHTML = arrWords[i][0];
    secondTd.innerHTML = arrWords[i][1];
    lastTd.innerHTML = arrWords[i][2];
    
    tr.appendChild(firstTd);
    tr.appendChild(secondTd);
    tr.appendChild(lastTd);
    showAllWords.appendChild(tr);
  }
}

function togglePosition() {
    if (changeLang.checked == false && direction.checked == false) {
        prime = 0;
        next = 1;
        innerLang.innerHTML = 'Ro';
        innerDirection.innerHTML = 'En to Ro';
    }

    if (changeLang.checked == false && direction.checked == true) {
        prime = 1;
        next = 0;
        innerLang.innerHTML = 'Ro';
        innerDirection.innerHTML = 'Ro to En';
    }

    if (changeLang.checked == true && direction.checked == false) {
        prime = 0;
        next = 2;
        innerLang.innerHTML = 'Ru';
        innerDirection.innerHTML = 'En to Ru';
    }

    if (changeLang.checked == true && direction.checked == true) {
        prime = 2;
        next = 0;
        innerLang.innerHTML = 'Ru';
        innerDirection.innerHTML = 'Ru to En';
    }
}

function pushElements() {
    header.style.display = 'none';
    hideBlock.style.display = 'block';
    hideBlock.addEventListener('click', showHideBlockStart);

    for (var i = 0; i < numFloat; i++) {
        var tr = document.createElement('tr');
      
        var firstTd = document.createElement('td');
        var secondTd = document.createElement('td');
      
        var span = document.createElement('span');
        var input = document.createElement('input');
        input.addEventListener('keyup', checkResult);

        span.innerHTML = arrWords[i][prime] + ' : ';
        
        firstTd.appendChild(span);
        
        secondTd.appendChild(input);
        
        tr.appendChild(firstTd);
        tr.appendChild(secondTd);

        pushElem.appendChild(tr);
    }
}

function checkResult() {
    allInputsResult = pushElem.querySelectorAll('input');

    for (var i = 0; i < allInputsResult.length; i++) {
        if (allInputsResult[i].value != '') {
            arrResult[i] = allInputsResult[i].value.toLowerCase();
        }
    }

    for (j = 0; j < arrResult.length; j++) {
        if (arrWords[j][next] == allInputsResult[j].value.toLowerCase()) {
            allInputsResult[j].style.border = '2px solid green';
        } else {
            allInputsResult[j].style.border = '2px solid red';
            help.addEventListener('click', helpElem);
        }
    }

}

function helpElem() {
    allInputsResult[j - 1].value = arrWords[j - 1][next];
    allInputsResult[j - 1].style.border = '2px solid green';
}

function pushButton() {
    numFloat = Number(enterNum.value);
    pushElements();
    push.removeEventListener('click', pushButton);
    pushAll.removeEventListener('click', pushButtonAll);

}

function pushButtonAll() {
    numFloat = arrWords.length;
    pushElements();
    push.removeEventListener('click', pushButton);
    pushAll.removeEventListener('click', pushButtonAll);
}

function groupArr(arrName, num_in_group) {
    var newArr = [];

    for (var i = 0; i < arrName.length; i++) {
        var temp = [];

        for (var j = 0; j < num_in_group; j++) {
            temp.push(arrName[i + j]);
        }

        newArr.push(temp);
        i += j - 1;
    }

    return newArr;
}

function randomArrElements(arr) {
    var randomNums = getUniqueNums(arr.length);
    var randomArr = [];
    for (var i = 0; i < arr.length; i++) {
        randomArr[i] = arr[randomNums[i]];
    }

    function getUniqueNums(num) {
        var numRandomArr = [];

        while (numRandomArr.length < num) {
            var random = Math.floor(Math.random() * Math.floor(num));
            if (numRandomArr.indexOf(random) != -1) continue;
            numRandomArr[numRandomArr.length] = random;
        }

        return numRandomArr;
    }

    return randomArr;
}

function pushNumInPushButton() {
    push.value = 'Push ' + enterNum.value + ' words';
}

function showHideBlockStart(){
  hideBlock.style.right = '0';
  activeBlock.style.zIndex = '-1';
  hideBlock.removeEventListener('click', showHideBlockStart);
  hideBlock.addEventListener('click', showHideBlockStop);
}

function showHideBlockStop(){
  hideBlock.style.right = '-80px';
  activeBlock.style.zIndex = '1';
  hideBlock.addEventListener('click', showHideBlockStart);
  hideBlock.removeEventListener('click', showHideBlockStop);
}

function refreshDoc() {
    window.location.reload();
}
