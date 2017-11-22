# lightbox

My program consists of the following files:

- app.js
- app.css
- index.html
- DomUtilityService.js

#### DOM Notes:
- I am using document fragments to increase DOM performance. 
- I am also caching elements to decrease DOM lookups. 
- I made a DOM utility class for creating any DOM elements/document fragments.


#### Usability Notes:
- I added alt descriptions to img for accessibility and for SEO.
- Hovering over images and buttons that lead to actions will enlargen to notify the user that it is clickable.
- I am using flexbox for both grid and lightbox layout.


#### Future Improvements
If I had been using a build tool, I would have broken individual script files into modules. Since I am not using a build tool, individual script files are included into global.
