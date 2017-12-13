#Use Alpine linux with NodeJS LTS preinstalled as base
FROM node:8-stretch

#Create working directory and copy all files to it
WORKDIR /busns
COPY . .

#Install node modules
RUN npm install

#Expose port from container
EXPOSE 8080
#Start REST API
CMD ["npm", "start"]