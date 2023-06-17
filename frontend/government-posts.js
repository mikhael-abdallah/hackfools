window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const countryId = urlParams.get('country');
    console.log({countryId})
    
    fetch(`http://localhost:3000/api/post/${countryId}`)
    .then(response => response.json())
    .then(data => {
        console.log({data})
        const postsContainer = document.getElementById('country-posts');

        data.result.forEach(post => {
            const postCard = document.createElement('div');
            postCard.classList.add('post-card');

            const flag = document.createElement('img');
            flag.src = post.government.icon;
            flag.alt = `Bandeira do ${post.government.country}`;

            const postContent = document.createElement('p');
            postContent.textContent = post.content;

            postCard.appendChild(flag);
            postCard.appendChild(postContent);
            postsContainer.appendChild(postCard);
        });
    })
    .catch(err => console.error('Erro:', err));
}
