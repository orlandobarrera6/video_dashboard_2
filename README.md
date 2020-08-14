# video_dashboard_2

To see the project live:

1. Clear any servers from localhost:3000 and localhost:5000
2. Clone the repo in your localhost with HTTPS
3. Once the project is downloaded in your local environment: <br />
   3.a. Open the command line. <br />
   3.b. Navigate to the project directory "/video_dashboard_2" and inside run the command: "sudo npm install". <br />
   3.c. Now go into the client directory "/video_dashboard_2/client" and again inside run the command: "sudo npm install". <br />
4. Inside of the project directory "/video_dashboard_2" create a directory called "config".
5. Email me at orlandobarrera6@gmail.com, I will provide you the "keys.js" file to place inside of the config folder you just created in the project directory.
6. Navigate back to the project directory "/video_dashboard" and run the command: "sudo npm run dev". To fire up the project's backend and frontend.
7. On your web browser type: localhost:3000 and click enter.
8. Sign in with google! Looking forward to seeing your activity on the cloud :)

Technical questions:

1. What would you add to your solution if you had more time? <br />
   A. I would have finished the Gallery view in the project, created a modal for video streaming, would have added asychronous pagination in the backend, as well as write more tests. <br />

2. How would you track down a performance issue in production with the application you created? <br/>
   A. I would have to create a robust backend logging system that records all HTTP requests being done to the API, and using the logs from the logging system see what calls or context was present at the moment of the performance issue.<br/>

3. Why did you choose the language/framework/libraries you did to create the application? What was the most useful feature of the language selected? <br/>
   A. I chose the following software infrastructure: <br/>
      O. language: Javascript.<br/>
      i. Frontend: React.<br/>
            i.a. UI component framework: Material UI <br/>
      ii. Frontend state management: Redux.<br/>
      iii. API server: Node, especifically Express.<br/>
      iv. Data base: MongoDB <br/>
      v. File storage: AWS S3 bucket. <br/>
      vi. User authentificatiuon and session tracking system: passport, specifically the Google strategy.<br/>
   And the reason for choosing this infrasctructure was familiarity with the frameworks and libraries. And the feature that was the most useful of using Javascript is that I was able to write the entire front end and back end with just one language, instead of using multiple languages for both front end and back end.
