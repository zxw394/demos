<template>
  <div class="home">
    <textarea v-model="value" cols="100" rows="30"></textarea>
    <button @click="startCreate">Create file</button>
    <a download="info.html" id="downloadlink" style="display: none">Download</a>
  </div>
</template>

<script>
// @ is an alias to /src
import _ from 'lodash'
import {makeTextFile, converter, outerHTML} from '@/assets/js/until'
export default {
  name: 'home',
  data () {
    return {
      // eslint-disable-next-line no-undef
      value: ''
    }
  },
  created () {
    let tableObj = {
      //tag
      '<>': 'div',
      'html': [
        {
          '<>': 'span',
          'html': ['ookkkooo']
        },
        {
        '<>': 'table',
        'html': [
          {
            '<>': 'thead',
            'html': [
              {'<>': 'tr', html: [
                  {'<>': 'th', html: ['title']},
                  {'<>': 'th', html: ['year']}
                ]
              }
            ]
          },
          {
            '<>': 'tbody',
            'html':[
              {
                '<>': "tr",
                'html': [
                  {'<>': 'td', html: ['123454']},
                  {'<>': 'td', html: ['777777']}
                ],
                'dataSource': 'https://www.fastmock.site/mock/7f143c4ab35b8dbc46edbcc32c83547a/ty/json2html'
              }
            ]
          }
        ]
      }
      ]
    }
    this.value = JSON.stringify(tableObj, undefined, 4);
    let tableEle = [{
      '<>': 'table',
      'html': [
        {
          '<>': 'thead',
          'html': [
            {'<>': 'tr', html: [
                {'<>': 'th', html: ['title']},
                {'<>': 'th', html: ['year']}
              ]
            }
          ]
        },
        {
          '<>': 'tbody',
          'html':[
            {
              '<>': "tr",
              'html': [
                {'<>': 'td', html: ['123454']},
                {'<>': 'td', html: ['777777']}
              ],
              'dataSource': 'https://www.fastmock.site/mock/7f143c4ab35b8dbc46edbcc32c83547a/ty/json2html'
            }
          ]
        }
      ]
    }]
  },
  methods: {
    startCreate () {
      let link = document.getElementById('downloadlink');
      let genarateDom = converter(JSON.parse(this.value)).render();
      link.href = makeTextFile(outerHTML(genarateDom));
      window.requestAnimationFrame(function () {
        let event = new MouseEvent('click');
        link.dispatchEvent(event);
      });
    },
    async urlSender(){
      let data = await this.getData();
      console.log(data, "data~~~");
    },
    getData () {
      return fetch('https://www.fastmock.site/mock/7f143c4ab35b8dbc46edbcc32c83547a/ty/json2html').then((resp) => resp.json())
      .then((resp) => resp);
    }
  }
}
</script>
