<template>
  <v-dialog v-if="user && keyPoint" v-model="editKeyPoint.visible" width="500">
    <v-card>
      <v-card-title class="headline grey lighten-2">
        Key point details
      </v-card-title>

      <v-col cols="12">
        <v-row>
          <v-text-field
            v-model.trim="keyPoint.title"
            class="text-field-custo ma-4"
            label="Title"
            hide-details
            dense
            filled
          />
        </v-row>
        <v-row class="ml-1 mb-3 mt-3">
          <span class="subtitle-1 mr-3">Priority</span>
          <v-btn
            v-for="prio in Object.keys(KEY_POINT_PRIORITY)"
            :key="prio"
            :color="priorityColor(KEY_POINT_PRIORITY[prio])"
            small
            class="white--text mr-1"
            :depressed="keyPoint.priority !== KEY_POINT_PRIORITY[prio]"
            @click="keyPoint.priority = KEY_POINT_PRIORITY[prio]"
          >
            {{ prio }}
            <v-icon v-if="keyPoint.priority === KEY_POINT_PRIORITY[prio]" small>
              mdi-check
            </v-icon>
          </v-btn>
        </v-row>
      </v-col>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey" text @click="editKeyPoint.visible = false">
          Cancel
        </v-btn>
        <v-btn color="primary" text @click="saveKeyPoint">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { KEY_POINT_PRIORITY } from "../js/constants.js";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data: function() {
    return {
      toggle_priority: 0,
      KEY_POINT_PRIORITY: KEY_POINT_PRIORITY
    };
  },
  computed: {
    ...mapState("user", ["user", "editKeyPoint"]),
    keyPoint() {
      return this.editKeyPoint.keyPoint;
    }
  },
  methods: {
    ...mapActions({
      saveUser: "user/saveUser"
    }),
    ...mapMutations({
      setEditKeyPoint: "user/setEditKeyPoint"
    }),
    async saveKeyPoint() {
      this.$set(
        this.user.keyPoints,
        this.editKeyPoint.keyPointId,
        this.keyPoint
      );
      await this.saveUser(this.user);
      this.setEditKeyPoint({ visible: false, keyPointId: "", keyPoint: {} });
    },
    priorityColor(priority) {
      if (priority == KEY_POINT_PRIORITY.LOW) return "blue";
      else if (priority == KEY_POINT_PRIORITY.MEDIUM) return "yellow";
      else if (priority == KEY_POINT_PRIORITY.HIGH) return "red";
    }
  }
};
</script>

<style scoped>
.text-field-custo >>> .v-input__slot::before,
.text-field-custo >>> .v-input__slot::after {
  border-style: none !important;
}
</style>
