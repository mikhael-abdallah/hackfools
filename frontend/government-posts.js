function createPostElement(post) {
    const postElement = document.createElement("div");
    postElement.classList.add("post");

    // Create the author section
    const authorSection = document.createElement("div");
    authorSection.classList.add("post-author");

    // Create the profile picture
    const profilePicture = document.createElement("img");
    profilePicture.src = post.government.icon;
    profilePicture.alt = `${post.government.country}'s Profile Picture`;
    authorSection.appendChild(profilePicture);

    // Create the author name
    const authorName = document.createElement("span");
    authorName.textContent = post.government.country;
    authorSection.appendChild(authorName);

    // Add the author section to the post element
    postElement.appendChild(authorSection);

    // Create the post content
    const content = document.createElement("p");
    content.textContent = post.content;
    postElement.appendChild(content);

    return postElement;
}

// Function to render the posts
function renderPosts(posts) {
    const postContainer = document.getElementById("post-container");
    postContainer.innerHTML = ""; // Clear previous posts
    posts.forEach((post) => {
        const postElement = createPostElement(post);
        postContainer.appendChild(postElement);
    });
}

window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const countryId = urlParams.get('country');
    console.log({ countryId })

    fetch(`http://localhost:3000/api/post/${countryId}`)
        .then(response => response.json())
        .then(data => data.result).then(data => renderPosts(data))
}



//         const postsContainer = document.getElementById('country-posts');

//         data.result.forEach(post => {
//             const postCard = document.createElement('div');
//             postCard.classList.add('post-card');

//             const flag = document.createElement('img');
//             flag.src = post.government.icon;
//             flag.alt = `Bandeira do ${post.government.country}`;

//             const postContent = document.createElement('p');
//             postContent.textContent = post.content;

//             postCard.appendChild(flag);
//             postCard.appendChild(postContent);
//             postsContainer.appendChild(postCard);
//         });
//     })
//     .catch(err => console.error('Erro:', err));
// }
