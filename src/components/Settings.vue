<template lang="pug">
div
  p(v-if="expired") Token expired
  p(v-if="ttl") Access to this page with requested token granted due to {{date()}}
  div(v-if="!group") Loading...
  div(v-if="group")
    form
      p Greeting message
        |
        |
        input(type="text" v-model="group.greeting")
      p Ban timeout (minutes)
        |
        |
        input(type="number" v-model="group.ban_timeout")
      p URL Protection
        input(type="checkbox" v-model="group.ban_url")
      p Question protection
        input(type="checkbox" v-model="group.ban_question")
      p Questions
        |
        |
        input(type="button" value="Add new question" @click="addQuestion")
      div(v-for="question, index in group.questions" class="question")
        p Question
          input(type="text" v-model="question.text")
        div(v-for="answer in question.answers")
          p Answer
            input(type="text" v-model="answer.text")
            input(type="checkbox" v-model="answer.correct")
            | Correct
        input(type="button" value="Add new answer" @click="addAnswer(index)")
      br
      input(type="submit" value="Save" :disabled="blocked" @click="save")
      p(v-if="saved") Saved

</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { Group, Question, ServiceService, Answer } from '@/api'
import dayjs from 'dayjs'

export default class Settings extends Vue {
  group: Group | null = null
  ttl: string | null = null
  expired: boolean | null = null
  blocked = false
  saved = false

  date () : string {
    return dayjs(this.ttl).format('DD.MM.YYYY HH:mm')
  }

  mounted (): void {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')

    if (token === null) {
      return
    }

    ServiceService.getTokenData({ token }).then(data => {
      this.ttl = data.ttl

      return ServiceService.getGroup({ token })
    }).then(group => {
      this.group = group
    }).catch(() => {
      this.expired = true
    })
  }

  addQuestion (): void {
    if (this.group === null) {
      return
    }

    const q: Question = {
      text: '',
      answers: []
    }

    this.group.questions.push(q)
  }

  addAnswer (index: number): void {
    if (this.group === null) {
      return
    }

    const answer: Answer = {
      text: ''
    }

    this.group.questions[index].answers.push(answer)
  }

  save (e: Event): void {
    e.preventDefault()

    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')

    if (token === null) {
      return
    }

    if (this.group === null) {
      return
    }

    this.blocked = true

    ServiceService.saveGroup({ token, requestBody: this.group }).then(() => {
      this.saved = true
    }).finally(() => {
      this.blocked = false
    })
  }
}
</script>

<style>
.question {
  border: 1px solid black;
}
</style>
