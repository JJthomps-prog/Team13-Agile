const request = require('supertest');
const express = require('express');
const cheerio = require('cheerio');
const path = require('path');

describe('EJS Template Code Quality', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '../views'));

 
    app.get('/categories/events', (req, res) => {
      res.render('events', {
        eventData: [
        ]
      });
    });
  });

  it('EJS template should not contain inline styles', async () => {
    const response = await request(app).get('/categories/events');
    const renderedHtml = response.text;

    const $ = cheerio.load(renderedHtml);

    // Look for any elements with a 'style' attribute
    const inlineStyles = $('[style]');

    // The test passes if there are no elements with inline styles
    expect(inlineStyles.length).toBe(0);
  });
});
