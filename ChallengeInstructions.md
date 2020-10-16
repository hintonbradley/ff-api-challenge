Frontend Dev Take-Home Challenge

## OBJECTIVE: 
Write a status page for the FactoryFour APIs.

## STACK: 
This should be a single-page web application written using React in either TypeScript or JavaScript. HTTP calls can be made using any library.

## DETAILS:
- Each of our APIs has a health status endpoint that the public can query without authentication.
- For a successful request, each status endpoint will return four values:
  - success (boolean)
  - message (string)
  - hostname (string)
  - time (number)
- Your page should request the health status of each API every 15 seconds, always displaying the most recent result for each API.
- The endpoint URLs are of the form

    https://api.factoryfour.com/API_NAME/health/status

where API_NAME is one of:

    accounts
    assets
    customers
    datapoints
    devices
    documents
    forms
    invites
    media
    messages
    namespaces
    orders
    patients
    relationships
    rules
    templates
    users
    workflows


## NOTES:
- One of the APIs is deprecated and will always return a 503 error. This information should be displayed on your status page as if it were a real outage.
- The hostname string returned by the API is partially random and a new hostname will be generated for each call. The most recent hostname should be displayed.


## DESIGN CONCERNS:
- Our customers want simple, legible solutions. This status page doesn't have to look impressive or convey a brand identity, but it does have to be extremely easy to read and understand.
- The code should be easy to read, understand, and change. For example, a customer success rep might need to change the 15-second interval to a 10-second interval. Someone with a limited working knowledge of JS should be able to find that line of code, change it on a branch in GitLab, and tag you for approval. Choose variable and file names that will help people grok your code with minimal effort.


## SUBMITTING:
- Publish your code as a Git repository on GitHub or GitLab and reply to this email with the URL; it can be a public repo, or a private repo accessible by @alexjmathews and @chrmcg.
- Not required, but you may also deploy your app to the Web and provide a public URL in your email reply.
- This is a 24-hour challenge. Please send your response by noon Pacific on Saturday, September 5.

-----------------------------------

### QUESTIONS I HAD (WITH ANSWERS):
1. For this project, you want all the API health statuses displayed on one single page at the same time, right? (as long as it refreshes the data every 15 seconds and also includes the 503 error for that particular API).  Or if I'm mistaken, should the user have the ability to select which results to view from ONE api at a time?
- Answer: Yes! The user should be able to see all of the APIs' most recent statuses together on a single page.

2. Is it safe to assume the status page should be responsive and should be viewable on mobile, tablet and desktop devices?
- Answer: The user's choice of device should not impede their ability to use the app, but there's no need to worry about handling transitions between different screen sizes.

3. I assume since the page is going to be checking the status every 15 seconds that you only want the most recent data viewable on the page for each API. If you'd rather have a list or results for each, please let me know. (i.e. 0 seconds ago, 15, seconds ago, 30 seconds ago...etc.)
- Answer: Only the most recent status check needs to be displayed at any given time.

4. For the 503 error  - is there anything in addition to "503 Service Unavailable" that you'd like to be displayed?
- Answer: Text-wise, just relaying the message returned from the server is sufficient, but it's up to you to choose how to present or highlight it visually.

5. For the time value that is returned, I see the result is in Pacific time. Should I account for updating the result for users not in the Pacific Daylight Time zone? i.e. should I ask permission to access the user's location so I can present the time in their time zone?
- Answer: The time value returned is a Unix timestamp in milliseconds, time-zone agnostic. In terms of formatting, browsers should already be aware of the user's time zone -- no need to ask for location permissions!


### FIRST ATTEMPT:
After receiving these answers, I worked on the application for a few hours but then came across the CORS error. I asked the following questions to get some clarity:

<em>I seem to be running into an issue when trying to request data from the following apis:

invites
messages
users

When I try to make a request I get the following error: 
Access to XMLHttpRequest at 'https://api.factoryfour.com/users/health/status' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.

I've searched online, and see that generally I need a header when requesting certain apis. I've tried adding a header to my request with a random key:value, but it's obviously not working. Should I be using a specific key value pair in my header?

As far as I can tell, the other apis are working fine and returning either the correct data or an error. Also, when I use a try catch, the error I get back on these three requests is "Error: Network Error". Should I display this error in my UI for these three APIs? If not, would you have any suggestions for me when sending requests to these APIs?</em>

## RESPONSE
The response I received was as follows:

<em>Thanks for asking this question! We are aware of the CORS issue on these three APIs and we expect candidates to encounter it.

The gist of the CORS issue isn’t that you (the browser client) need to add extra headers to your request, but that the server actually needs to add those headers to its response. Chrome will block the response if it doesn’t see those headers — but if you use curl, Postman, or another tool to make the requests directly, you will see the response come through clear as day, despite the missing headers.

The way around it in practice is to either upgrade the API server to support CORS, or create a “CORS proxy” middleman server. That’s definitely not required for this challenge! Instead, you can display the fact that CORS is misconfigured for these APIs as part of the status page. Ideally, the UI would be able to distinguish CORS issues from actual server outages, even though the server that’s down won’t be sending CORS headers either.

Thanks for the question, it sounds like progress is being made!</em>

------------------

## SECOND ATTEMPT:
I took his response to mean to that I had two options. I could either get around the CORS issue by incorporating a server (Express) in my application to make those API calls, or instead I could simply display an error whenever I encourtered that CORS issue. Since I didn't want to scrap my project and what I had already done/rewrite it and start over using an Express server, I decided on the latter.

Therefore you can see from my code, whenever I don't receive state.apiName.success variable, I show an error message stating no data is available. 

## FINAL

Once I turned in my project. I received the following feedback:

<em>Hard-coded unchanging values in state - generally this should be avoided in favor of a fixed local variable or a variable on the class itself</em>

- I think here he may be referring to my const config variable? Otherwise, I'm not sure what he means.

<em>State constructed as a literal rather than mapped from ApiList</em>

- I'll give him this, but I can obviously map items as I do it in other places on this application.

<em>Hard coded error string - the error response was hardcoded to 503 rather than correctly handling a CORS issue from deliberately failing servers</em>

- Of course I have to hard code the error string. I don't get a response from the API to use, so it obviously needs to be hard coded. And when he says I should have handled a CORS issue - he said in his response that I should "...display the fact that CORS is misconfigured for these APIs as part of the status page". How else am I supposed to display a message if I don't receive one from my API request?

Hope this makes sense to you.  If you can take a look, great, otherwise, I think there was some miscommunication from their end as to what specifically they want. (Specs weren't explained correctly). Thanks for any help you can give. 