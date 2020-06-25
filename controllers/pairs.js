var PairController = { 
  Pairing: (request, response) => {
    // contact to get members

    //sort members into drivers and guest

    //contact google maps API and get all driver and guest routes

    //sort API return into members format

    // sort drivers and guests
    var members = [ 
      { name: 'Doris', 
        drivers: [ 
          { 
            name: 'Bradley', 
            distance: 8000 
          },
          { 
            name: 'Zeus', 
            distance: 2000 
          },
          {
            name: 'Kevin',
            distance: 3000
          },
          {
            name: 'Gwen',
            distance: 10000
          }
        ]
      },
      { name: 'Kimothey', 
        drivers: [ 
          { 
            name: 'Bradley', 
            distance: 6000 
          },
          { 
            name: 'Zeus', 
            distance: 3000 
          },
          {
            name: 'Kevin',
            distance: 500
          },
          {
            name: 'Gwen',
            distance: 5000
          }
        ]
      },
      { name: 'Perry', 
        drivers: [ 
          { 
            name: 'Bradley', 
            distance: 300 
          },
          { 
            name: 'Zeus', 
            distance: 10000 
          },
          {
            name: 'Kevin',
            distance: 600
          },
          {
            name: 'Gwen',
            distance: 100
          }
        ]
      },
      { name: 'Petunia', 
        drivers: [ 
          { 
            name: 'Bradley', 
            distance: 300 
          },
          { 
            name: 'Zeus', 
            distance: 400 
          },
          {
            name: 'Kevin',
            distance: 6000
          },
          {
            name: 'Gwen',
            distance: 5000
          }
        ]
      }
    ]
    
    // randomly pair drivers and guests
    var pairings = PairController._generatePairsByDistance(members);

    response.send({ pairs: pairings});
  },
  Map: (request, response) => {
    response.render('map')
  },
  Route: (request, response) => {
    const googleMapsClient = require('@google/maps').createClient({
      key: 'AIzaSyC9qJYJPqeVBtCCvu68wQ286oyCL8Z5PqQ',
      Promise: Promise
    });

    googleMapsClient.directions({origin: 'SW129PH', destination: 'SE153XX', mode: 'driving'})
    .asPromise()
    .then((result) => {
      console.log(result);
      response.send(result)
    }); 
  }
}

// UTILITY METHODS

PairController._generatePairsByDistance = (pairDistances) => {

  // compare all distances 'find shorted global pair distance' 
  // assign pair to output 
  // eliminate that driver from all other guests 
  // repeat until one pair left
  // return output 


  // while loop, until guests array < 1 

  var pairing = []

  while(pairDistances.length > 1) {
    var shortestPair = {id: 0, distance: 100000000}
    var guestIndex; 
    var driverIndex;

    pairDistances.forEach((guest, i) => {
    
      guest.drivers.forEach((driver, j) => {
        if (driver.distance < shortestPair.distance) {
          shortestPair = { id: pairing.length + 1, 
            driver: driver.name, 
            guest: guest.name,
            distance: driver.distance 
          }
          guestIndex = i;
          driverIndex = j;
        }
      });
    })
    pairing.push(shortestPair)
    pairDistances.splice(guestIndex, 1)

    pairDistances.forEach((guest) => {
      guest.drivers.splice(driverIndex, 1)
    })
  }

  var lastPair = {
    id: pairing.length + 1,
    driver: pairDistances[0].drivers[0].name,
    guest: pairDistances[0].name,
    distance: pairDistances[0].drivers[0].distance
  }
  
  pairing.push(lastPair)
  console.log(pairing)
  return pairing
};

















PairController._generatePairs = (members) => {
  // randomise the order of each members and guests array
  var mixedMembers = PairController._mixMembers(members);

  //pair up drivers and guests from arrays
  var pairs = mixedMembers.drivers.map((driver, index) => {
    return {
      id: index+1,
      driver: driver.name,
      guest: mixedMembers.guests[index].name
    }
  });
  return pairs
}

PairController._mixMembers = (members) => {
  members.drivers = PairController._shuffleArray(members.drivers);
  members.guests = PairController._shuffleArray(members.guests);
  return members;
}

PairController._shuffleArray = (array) => {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}



module.exports = PairController;