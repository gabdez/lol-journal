<template>
  <lol-card :height="'100%'" :max-height="'360px'">
    <v-col>
      <v-row>
        <v-col cols="5">
          <v-card-title class="white--text">Key Points</v-card-title>
          <v-card-subtitle class="grey--text">
            Key points to focus to improve your gameplay.
          </v-card-subtitle>
        </v-col>
        <v-spacer />
        <v-col cols="6">
          <v-row class="mt-4">
            <v-col cols="9">
              <v-text-field
                placeholder="Enter new key point"
                v-model.trim="newKeyPoint"
                hide-details
                dense
                solo
                @keypress.enter="AddNewKeyPoint"
              />
            </v-col>
            <v-col cols="3" class="pl-0">
              <v-btn @click="AddNewKeyPoint" icon>
                <v-icon color="white">mdi-arrow-right</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col cols="12">
          <v-list v-if="user" flat color="transparent" class="pt-0">
            <v-list-item v-for="k in keyPoints" :key="k.id">
              <v-list-item-action class="ma-0">
                <v-avatar
                  :color="priorityColor(k.keypoint.priority)"
                  size="13"
                />
              </v-list-item-action>
              <v-list-item-content class="white--text">
                <v-list-item-title v-text="k.keypoint.title" />
              </v-list-item-content>
              <v-list-item-action class="ma-0">
                <v-btn icon @click="editKeyPoints(k.key)">
                  <v-icon color="white">mdi-square-edit-outline</v-icon>
                </v-btn>
              </v-list-item-action>
              <v-list-item-action class="ma-0">
                <v-btn icon @click="deleteKeyPoints(k.key)">
                  <v-icon color="primary">mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-col>
  </lol-card>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import lolCard from "./basics/lol-card.vue";
import { KEY_POINT_PRIORITY } from "../js/constants.js";
import { v4 as uuidv4 } from "uuid";
export default {
  components: { lolCard },
  data: function() {
    return {
      newKeyPoint: "",
      KEY_POINT_PRIORITY: KEY_POINT_PRIORITY
    };
  },
  computed: {
    ...mapState("user", ["user"]),
    keyPoints() {
      return Object.keys(this.user.keyPoints)
        .map(key => {
          return { key: key, keypoint: this.user.keyPoints[key] };
        })
        .sort((a, b) => b.keypoint.priority - a.keypoint.priority);
    }
  },
  methods: {
    ...mapActions({
      saveUser: "user/saveUser"
    }),
    ...mapMutations({
      setEditKeyPoint: "user/setEditKeyPoint"
    }),
    async AddNewKeyPoint() {
      if (this.newKeyPoint != "") {
        console.log(this.newKeyPoint);
        let keyPoint = {
          title: this.newKeyPoint,
          priority: KEY_POINT_PRIORITY.HIGH
        };
        this.$set(this.user.keyPoints, uuidv4(), keyPoint);
        await this.saveUser(this.user);
        this.newKeyPoint = "";
      }
    },
    deleteKeyPoints(keyId) {
      this.$delete(this.user.keyPoints, keyId);
      this.saveUser(this.user);
    },
    editKeyPoints(keyId) {
      this.setEditKeyPoint({
        visible: true,
        keyPointId: keyId,
        keyPoint: { ...this.user.keyPoints[keyId] }
      });
    },
    priorityColor(priority) {
      if (priority == KEY_POINT_PRIORITY.LOW) return "blue";
      else if (priority == KEY_POINT_PRIORITY.MEDIUM) return "yellow";
      else if (priority == KEY_POINT_PRIORITY.HIGH) return "red";
    }
  }
};
</script>

<style scoped></style>
