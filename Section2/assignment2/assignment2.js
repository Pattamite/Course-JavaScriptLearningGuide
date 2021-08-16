const task3Element = document.getElementById('task-3');

function greeting(){
    alert('Hi!');
}

function greetingUser(user){
    alert(`Hi ${user}!`);
}

function concat3String(str1, str2, str3){
    return `${str1}${str2}${str3}`;
}

greeting();
greetingUser('Pattamite');
alert(concat3String('A', 'B', 'C'));

task3Element.addEventListener('click', greeting);