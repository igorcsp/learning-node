
async function sendEmailWithTopMovies() {
  try {
    const user = await getCustomer()
    console.log('Customer:', user)
    if (user.isGold) {
      const topMovies = await getTopMovies()
      console.log(`Top Movies: ${topMovies}`);
      sendEmail(user.email, topMovies)
    }
  } catch (error) {
    console.log(error)
  }
}

sendEmailWithTopMovies()

function getCustomer() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: 'Mosh Hamedani',
        isGold: true,
        email: 'email@email.com'
      });
      reject(new Error('Could not get customer'))
    }, 2000);
  })
}

function getTopMovies() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(['movie1', 'movie2']);
      reject(new Error('Could not get top movies'))
    }, 2000);
  })
}

function sendEmail(email, movies) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(console.log(`Sending ${movies} to the user e-mail: ${email}`));
      reject(new Error('Could not send e-mail'))
    }, 2000);
  })
}