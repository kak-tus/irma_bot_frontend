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
      div(v-for="question, questionIndex in group.questions" class="question")
        input(type="button" value="Delete this question" @click="deleteQuestion(questionIndex)")
        p Question
          |
          |
          input(type="text" v-model="question.text")
        div(v-for="answer, answerIndex in question.answers")
          p Answer
            |
            |
            input(type="text" v-model="answer.text")
            input(type="checkbox" v-model="answer.correct")
            | Correct
            |
            input(type="button" value="Delete answer" @click="deleteAnswer(questionIndex, answerIndex)")
        input(type="button" value="Add new answer" @click="addAnswer(questionIndex)")
      br
      input(type="submit" value="Save" :disabled="blocked" @click="save")
      p(v-if="saved") Saved

</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { OpenAPI, Group, Question, AuthService, Answer, GroupService } from '@/api'
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
    OpenAPI.BASE = window.FRONT_API_URL

    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')

    if (token === null) {
      return
    }

    AuthService.getTokenData({ token }).then(data => {
      this.ttl = data.ttl

      return GroupService.getGroup({ token })
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

  deleteQuestion (questionIndex: number): void {
    if (this.group === null) {
      return
    }

    if (this.group.questions[questionIndex] === undefined) {
      return
    }

    this.group.questions.splice(questionIndex, 1)
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

  deleteAnswer (questionIndex: number, answerIndex: number): void {
    if (this.group === null) {
      return
    }

    if (this.group.questions[questionIndex] === undefined) {
      return
    }

    if (this.group.questions[questionIndex].answers[answerIndex] === undefined) {
      return
    }

    this.group.questions[questionIndex].answers.splice(answerIndex, 1)
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

    GroupService.saveGroup({ token, requestBody: this.group }).then(() => {
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
