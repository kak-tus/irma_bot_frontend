<template lang="pug">
div
  p Access to this page with requested token granted due to
  div(v-if="!group") Loading...
  div(v-if="group")
    form
      p Greeting message&nbsp;
        input(type="text" v-model="group.greeting")
      p Ban timeout (minutes)&nbsp;
        input(type="text" v-model="group.ban_timeout")
      p URL Protection
        input(type="checkbox" v-model="group.ban_url")
      p Question protection
        input(type="checkbox" v-model="group.ban_question")
      p Questions&nbsp;
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
      input(type="submit" value="Save")

</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { Group, Question, ServiceService, OpenAPI, Answer } from '@/api'

export default class Settings extends Vue {
  group: Group | null = null

  mounted (): void {
    OpenAPI.BASE = 'http://127.0.0.1:8080/api/v1'

    ServiceService.getGroup({ id: -1001117778815 }).then(group => {
      this.group = group
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
}
</script>

<style>
.question {
  border: 1px solid black;
}
</style>
