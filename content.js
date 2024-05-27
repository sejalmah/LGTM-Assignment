const newProfilePicturePath = 'image.jpg'

// Function to replace profile pictures
function replaceProfilePictures() {
  const profilePictures = document.querySelectorAll('img.ember-view');
  console.log(`Found ${profilePictures.length} profile pictures`);
  profilePictures.forEach(pic => {
    console.log('Replacing image:', pic.src);
    pic.src = "image.jpg"
    pic.srcset = `${chrome.runtime.getURL(newProfilePicturePath)}`;
    pic.setAttribute('loading', 'eager');
  });
}

replaceProfilePictures();

const observer = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
      if (node.nodeType === 1) { 
        if (node.querySelectorAll) {
          const newProfilePictures = node.querySelectorAll('img.ember-view');
          newProfilePictures.forEach(pic => {
            console.log('Replacing image:', pic.src);
            pic.src = "image.jpg"
            pic.srcset = `${chrome.runtime.getURL(newProfilePicturePath)}`;
            pic.setAttribute('loading', 'eager');
          });
        }
      }
    });
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
