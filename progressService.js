import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const ensureUserProgressExists = async () => {
  const user = auth().currentUser;

  if (user) {
    const userRef = firestore().collection('users-progress').doc(user.uid);
    const doc = await userRef.get(); //DocumentSnapshot object.

    if (!doc.exists) { //A boolean indicating whether the document exists in Firestore.

        console.log("Not found ")
      // Initialize progress if it doesn't exist
      await userRef.set({
        tests: 0,
        articles: 0,
        courses:0,
        status:"Begineer",
        uid:user.uid,
        points:0,
      });
      console.log("User created successfully!");

    }
  } else {
    console.error('User not authenticated');
  }
};

const incrementProgress = async (type) => {
    const user = auth().currentUser;
  
    if (user) {
      const userRef = firestore().collection('users-progress').doc(user.uid);
  
      // Ensure progress exists before updating
      await ensureUserProgressExists();
  
      let pointsToAdd = 0;
      switch (type) {
        case 'tests':
          pointsToAdd = 100; // Complete a quiz adds 100 points
          console.log("test points")
          break;
        case 'articles':
          pointsToAdd = 50; // Reading an article adds 50 points
          console.log("articles points")
          break;
        case 'courses':
          pointsToAdd = 75; // Watching a video adds 75 points
          console.log("courses points")
          break;
        default:
          console.error('Unknown type:', type);
          return;
      }

      // Use update instead of set for atomic increment
      console.log('Incrementing progress for:', type);
      await userRef.update({
        [type]: firestore.FieldValue.increment(1),
        points:firestore.FieldValue.increment(pointsToAdd)
      });
      console.log(`${type} progress incremented and points updated.`);
        } else {
      console.error('User not authenticated');
    }
  };

export { incrementProgress };
