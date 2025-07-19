// Food donation functions
window.submitDonation = function(donationData) {
    const userId = auth.currentUser.uid;
    const newDonationKey = database.ref().child('donations').push().key;
    
    const updates = {};
    updates['/donations/' + newDonationKey] = donationData;
    updates['/user-donations/' + userId + '/' + newDonationKey] = donationData;
    
    return database.ref().update(updates)
      .then(() => {
        alert('Donation submitted successfully!');
        return newDonationKey;
      })
      .catch(error => {
        alert('Error submitting donation: ' + error.message);
      });
  };
  
  // Food request functions
  window.submitRequest = function(requestData) {
    const userId = auth.currentUser.uid;
    const newRequestKey = database.ref().child('requests').push().key;
    
    const updates = {};
    updates['/requests/' + newRequestKey] = requestData;
    updates['/user-requests/' + userId + '/' + newRequestKey] = requestData;
    
    return database.ref().update(updates)
      .then(() => {
        alert('Request submitted successfully!');
        return newRequestKey;
      })
      .catch(error => {
        alert('Error submitting request: ' + error.message);
      });
  };
  
  // Get donations for homepage
  window.getRecentDonations = function(limit = 5) {
    return database.ref('donations').limitToLast(limit).once('value')
      .then(snapshot => {
        const donations = [];
        snapshot.forEach(childSnapshot => {
          donations.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        return donations.reverse(); // Newest first
      });
  };