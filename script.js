const allLessons = () => {
    let url = 'https://openapi.programming-hero.com/api/levels/all'
    fetch(url)
        .then(res => res.json())
        .then(data => showLessons(data.data));
};





const showLessons = (allLessons) => {
    let all = document.getElementById('lessons');
    all.innerHTML = '';
    for (const lesson of allLessons) {


        let lessSection = document.createElement('div');
        lessSection.innerHTML = `
        <button id ="lesson-btn-${lesson.level_no}" onclick="loadWords(${lesson.level_no})" class="btn btn-outline btn-primary mx-auto btn-lessons"><i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button>
        
        `
        // lessSection.classList.add('mx-auto',)
        all.appendChild(lessSection)
    }


}
allLessons()

const removeclass = () => {
    let activeBtn = document.querySelectorAll('.btn-lessons');
    // console.log(activeBtn)





    activeBtn.forEach(btn => {
        btn.classList.remove('bg-[#422AD5]', 'text-white')

    });
}

const loadWords = (id) => {
    // console.log(id)
    let url = `https://openapi.programming-hero.com/api/level/${id}`
    // console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => {


            removeclass()
            let clickedBtn = document.getElementById(`lesson-btn-${id}`)

            clickedBtn.classList.add('bg-[#422AD5]', 'text-white')
            displayWords(data.data)
        })
}

const displayWords = (word) => {
    // console.log(word)
    let words = document.getElementById('words')
    words.innerHTML = '';

    if (word.length == 0) {
        words.innerHTML = `
        
            <div class=" text-center col-span-full bangla">
                <img src="./assets/alert-error.png" alt="" class="mx-auto">
                <p>এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <p class="text-3xl">নেক্সট Lesson এ যান</p>
            </div>

        `
    }
    word.forEach(element => {
        // console.log(element)
        let eachWord = document.createElement('div');

        eachWord.innerHTML = `
            <div class="card bg-white  py-13 space-y-2.5 px-10 mx-auto text-center ">
                <h3 class="font-bold">${element.word ? element.word : "word not found"}</h3>
                <p>Meaning /Pronounciation</p>
                <h1 class="text-2xl font-bold">"${element.meaning ? element.meaning : "Meaning not found"} / ${element.pronunciation ? element.pronunciation : "pronunciation not found"}"</h1>
                  <div class="flex justify-between ">
                    <button onclick="loadWordDetails(${element.id})" class="hover:bg-blue-100 p-1 rounded-2xl"><i class="fa-solid fa-circle-info"></i></button>
                    <button class="hover:bg-blue-100 p-1 rounded-2xl"><i class="fa-solid fa-volume-high" onclick = "pronounceWord('${element.word}')"></i></button>
                </div>
            </div>
    
    `

        words.append(eachWord)
    });


}


const loadWordDetails = (id) => {
    let url = `https://openapi.programming-hero.com/api/word/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayWordDetails(data.data))


}

const displayWordDetails = (word) => {
    // console.log(word)
    let details = document.getElementById('details');
    details.innerHTML = `
       <div class="p-1 rounded  max-w-[450px] mx-auto">
                        <h1 class="text-3xl font-bold">${word.word} (<i class="fa-solid fa-microphone"></i>:${word.meaning})</h1>
                        <h1 class="font-bold">Meaning</h1>
                        <p class="mb-6 text-2xl bangla">${word.meaning}</p>
                        <h2 class="font-medium">Example</h2>
                        <p>${word.sentence}</p>
                        <p class="bangla ">সমার্থক শব্দ গুলো:</p>
                 
                        <div>
                        ${synonym(word.synonyms)}
                       </div>

    
                    </div>
    `
    document.getElementById('modal').showModal()

}


const synonym = (word) => {
    let htmlElement = word.map(element => `<span class="bg-sky-200 px-2 py-1 rounded">${element}</span>`)
    return (htmlElement.join("  "))
}


document.getElementById('search-btn').addEventListener('click', () => {
    let input = document.getElementById('search-input')
    let inputValue = input.value.toLowerCase();

    if(inputValue.length > 0){
         fetch('https://openapi.programming-hero.com/api/words/all')
        .then(res => res.json())
        .then(data => {
            let wordData = data.data;
            // console.log(wordData)
            let filterWord = wordData.filter(word => word.word.toLowerCase().includes(inputValue))
            let filterWordStarts = wordData.filter(word => word.word.toLowerCase().startsWith(inputValue))
            // console.log(filterWord)
            displayWords(filterWord)
            displayWords(filterWordStarts);

        })

    }
    
   



})



function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-EN"; // English
    window.speechSynthesis.speak(utterance);
}