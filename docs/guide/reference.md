# Reference of the keys

This table is made from the parser of the library when the site is built: it lists every key, the forms a line can take and what the key makes. The pages of the guide explain each figure with examples.

A value between `<>` is a kind of value, `?` or `[]` mark what can be left out, and a last `*` chooses the alternative form of the construction.

<script setup>
import {data} from './reference.data'
</script>

<table>
  <thead>
    <tr><th>Key</th><th>Forms</th><th>What it makes</th></tr>
  </thead>
  <tbody>
    <tr v-for="item in data" :key="item.key">
      <td><code>{{ item.key }}</code></td>
      <td><div v-for="form in item.forms" :key="form"><code>{{ form }}</code></div></td>
      <td>{{ item.description }}</td>
    </tr>
  </tbody>
</table>
