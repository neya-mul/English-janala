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
        console.log(lesson);

        let lessSection = document.createElement('div');
        lessSection.innerHTML = `
        <button class="btn btn-outline btn-primary mx-auto"><i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button>
        
        `
        lessSection.classList.add('mx-auto',)
        all.appendChild(lessSection)
    }


}
allLessons()
