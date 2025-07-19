// Authentication functions
document.addEventListener('DOMContentLoaded', function() {
    // Check auth state
    auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in
        console.log('User logged in:', user.email);
        updateUIForLoggedInUser(user);
      } else {
        // No user is signed in
        console.log('User logged out');
        updateUIForLoggedOutUser();
      }
    });
  
    // Sign up function
    window.signUp = function(email, password, name) {
      auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Add user to database
          const user = userCredential.user;
          return database.ref('users/' + user.uid).set({
            email: email,
            name: name,
            role: 'donor' // or 'recipient' based on your form
          });
        })
        .then(() => {
          alert('Account created successfully!');
          window.location.href = 'dashboard.html';
        })
        .catch((error) => {
          alert(error.message);
        });
    };
  
    // Login function
    window.login = function(email, password) {
      auth.signInWithEmailAndPassword(email, password)
        .then(() => {
          window.location.href = 'dashboard.html';
        })
        .catch((error) => {
          alert(error.message);
        });
    };
  
    // Logout function
    window.logout = function() {
      auth.signOut()
        .then(() => {
          window.location.href = 'index.html';
        });
    };
  });
  
  // Update UI based on auth state
  function updateUIForLoggedInUser(user) {
    // Show/hide elements for logged in users
    document.querySelectorAll('.logged-in').forEach(el => el.style.display = 'block');
    document.querySelectorAll('.logged-out').forEach(el => el.style.display = 'none');
    
    // Display user info
    database.ref('users/' + user.uid).once('value')
      .then(snapshot => {
        const userData = snapshot.val();
        document.querySelector('.user-name').textContent = userData.name;
      });
  }
  
  function updateUIForLoggedOutUser() {
    document.querySelectorAll('.logged-in').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.logged-out').forEach(el => el.style.display = 'block');
  }