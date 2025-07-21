# Jay Mangat – Developer Portfolio

This repo contains various projects as an up-to-date snapshot of what I'm working on. It began with a simple hardcoded dashboard I built during my Master's program and has since evolved into a space where I bring ideas to life.

There's no strict theme, just things I thought were fun to build or worth learning. Feel free to explore!

If you'd like to connect, here's my [LinkedIn](https://www.linkedin.com/in/jay-mangat).

## Note on Local Usage

This project includes private APIs and environment variables that are not publicly available, so it may not run correctly outside of my setup.

Feel free to browse the code, but running the site locally is not currently supported.

## Projects
### Youtube Trend Analyzer - Postgres, ETL, CI/CD, Git, Python, React, FastAPI, SQL, RESTful API
I was curious about changing trends in the YouTube space and whether there's meaningful insight to be gained from videos that trend in different countries. This mock-up is a proof of concept for a more in-depth site aimed at users trying to go viral on YouTube (or TikTok/Instagram). Since I couldn't find any up-to-date datasets, I built my own using Google's YouTube API and stored the data in a SQL database. Setting up the Extract, Transform, Load (ETL) pipeline was new to me and would allow me to create my dataset by pulling trending videos from various countries daily and storing them in my database.

### Recipe Generator - React, FastAPI, Python, AWS S3, JavaScript, HTML, Pandas
For this project, I wanted experience working with a static dataset and returning results based on user input. I used AWS S3 to store the data instead of keeping it in the repo mostly as an excuse to learn more about AWS. For images and links, I use a custom Google Search Engine that queries each recipe’s name and returns a site with a full recipe and an associated image.

### Indian Air Quality Index Dashboard - Dash, Python, Pandas
My first experience building and deploying a web app. The frontend/backend is pretty simple, but this was where I first learned about Render (which I now use for all future apps). I like keeping this one around as it reminds me how far I've come.

## Reports
These are research-focused experiments I completed during my masters. They mainly consist of using statistical concepts or machine learning concepts in various use cases. A longer description and my final reports are available on the reports section of my site. 
