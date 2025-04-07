<template>
  <div></div>
</template>

<script setup>
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(https://rqqucecxsqzvbzpkxgzd.supabase.co, eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxcXVjZWN4c3F6dmJ6cGt4Z3pkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3ODI4MTMsImV4cCI6MjA1OTM1ODgxM30.zTJxEjXZgzvM2jc5VJTrhUeFNBFQdEK3ZpH90jSSscg)
// Make a request
const { data: todos, error } = await supabase.from('todos').select('*')
</script>

<style lang scoped></style>
