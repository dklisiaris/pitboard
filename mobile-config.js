App.info({
  id: 'org.klisiaris.pitboard',
  name: 'Pit Board',
  description: 'Real-time comm app for Racing Enthusiasts',
  author: 'Dimitris klisiaris',
  email: 'dklisiaris@gmail.com',
  website: 'pitboard.klisiaris.org'
});

App.icons({
  // Android
  'android_mdpi': 'resources/icons/mipmap-mdpi/ic_launcher.png',
  'android_hdpi': 'resources/icons/mipmap-hdpi/ic_launcher.png',
  'android_xhdpi': 'resources/icons/mipmap-xhdpi/ic_launcher.png',
  'android_xxhdpi': 'resources/icons/mipmap-xxhdpi/ic_launcher.png',
  'android_xxxhdpi': 'resources/icons/mipmap-xxxhdpi/ic_launcher.png'
});

App.launchScreens({
  // Android
  'android_portrait': 'resources/splash/android/res/drawable/screen.png',
  'android_landscape': 'resources/splash/android/res/drawable-land/screen.png',
  'android_mdpi_portrait': 'resources/splash/android/res/drawable-mdpi/screen.png',
  'android_mdpi_landscape': 'resources/splash/android/res/drawable-land-mdpi/screen.png',
  'android_hdpi_portrait': 'resources/splash/android/res/drawable-hdpi/screen.png',
  'android_hdpi_landscape': 'resources/splash/android/res/drawable-land-hdpi/screen.png',
  'android_xhdpi_portrait': 'resources/splash/android/res/drawable-xhdpi/screen.png',
  'android_xhdpi_landscape': 'resources/splash/android/res/drawable-land-xhdpi/screen.png',
  'android_xhdpi_portrait': 'resources/splash/android/res/drawable-xxhdpi/screen.png',
  'android_xhdpi_landscape': 'resources/splash/android/res/drawable-land-xxhdpi/screen.png',
  'android_xhdpi_portrait': 'resources/splash/android/res/drawable-xxxhdpi/screen.png',
  'android_xhdpi_landscape': 'resources/splash/android/res/drawable-land-xxxhdpi/screen.png'
});

App.setPreference('BackgroundColor', '#f8c939');
App.setPreference('HideKeyboardFormAccessoryBar', 'true');
App.setPreference('Fullscreen', 'false');
App.setPreference("orientation", "portrait");
