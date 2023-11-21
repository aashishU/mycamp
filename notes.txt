### Passport ###
- Tool to help with applying Authentication.
- Here we are using Passport-Local Strategy.
- npm package Passport-Local-Mongoose helps.

- We only need to mention 'email' in our schema, it automatically adds 'username' and 'password' fields.
- Passport will take the password entered by user, Add random Salt and turn it into a HASH.
- then Passport Local Mongoose will save it in Database.

** Password Hashing Function used here is "Pbkdf2", and not Bcrypt **
______________________________________________________________________________________
### IMAGE UPLOAD ###

1) Multer

- npm i multer.
- It's a Node.js middleware for handling "multipart/form-data", which is mainly used for uploading files...(in our case Image files to cloudinary).


2) cloudinary.com

- We can't upload images directly to our Mongo Database because of the large size.
- Hence, we will upload our image files on Cloudinary.com and take the URL of the uploaded image and save that in our Mongo Database.


3) dotenv

- We don't want our secret cloudinary information to mention directly in our app.
- We will hide that information using Dotenv tool.
- Make .env file in the root folder.
______________________________________________________________________________________