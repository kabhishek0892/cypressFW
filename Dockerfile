FROM cypress/include:9.2.0
# make directory inside container
RUN mkdir /app
WORKDIR /app
# copy cypress code from host to container
COPY . /app
# execute the tests
RUN npm install
#RUN $(npm bin)/cypress verify
#RUN $(npm bin)/cypress run --browser firefox
#RUN $(npm bin)/cypress run --browser chrome
ENTRYPOINT ["npm","run"]