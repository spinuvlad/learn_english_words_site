var strWords = 'already deja уже with cu с know cunoaste знать other alt другой may putea может can putea может majority majoritatea большинство overwhelming dominant подавляющий make face делать ubiquitous omniprezent повсеместный that care чтобы must trebuie должен specify specifica указывать content continut содержание behavior comportament поведение';


var header = document.getElementById('header');

var hideBlock = document.getElementById('hide-block');

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

numMax.innerHTML = arrWords.length;
pushAll.value += ' ' + arrWords.length + ' words'

enterNum.addEventListener('mouseout', pushNumInPushButton);
push.addEventListener('click', pushButton);
pushAll.addEventListener('click', pushButtonAll);
refresh.addEventListener('click', refreshDoc);
changeLang.addEventListener('click', togglePosition);
direction.addEventListener('click', togglePosition);

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

    for (var i = 0; i < numFloat; i++) {
        var div = document.createElement('div');
        var span = document.createElement('span');
        var input = document.createElement('input');
        input.addEventListener('keyup', checkResult);

        span.innerHTML = arrWords[i][prime] + ' : ';

        div.appendChild(span);
        div.appendChild(input);

        pushElem.appendChild(div);
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

function refreshDoc() {
    window.location.reload();
}
