const firebaseCloudMessaging = {
  init: async () => {
    if (!firebase?.apps?.length) {
      try {
        const messaging = getMessaging(app);
        const tokenInLocalForage = await localforage.getItem("fcm_token");

        // Return the token if it is already in our local storage
        if (tokenInLocalForage !== null) {
          return tokenInLocalForage;
        }

        // Get new token from Firebase
        await deleteToken(messaging);
        const fcm_token = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_VAPID,
        });

        // Set token in our local storage
        if (fcm_token) {
          localforage.setItem("fcm_token", fcm_token);
          return fcm_token;
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  },
};

export { auth, db, firebaseCloudMessaging };
