<template>
  <div aspectratio w-188-246>
    <div class="a" aspectratio-content>
      <div class="b">hello world!</div>
      <div aspectratio w-150-150>
        <div aspectratio-content>
          hello hello
        </div>
      </div>
      <div>
        aaa
      </div>
      <div class="e">

      </div>
      <div class="f"></div>
    </div>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld'

export default {

}
</script>

<style lang="scss">
@svg square{
  @rect {
    fill: #ccc;
    width: 100%;
    height: 100%;
  }
}

.a {
  // display: flex;

  .c {
    width: 700px;
    height: 30px;
    background: red;
  }

  .d{
    border-bottom: 1px solid #ccc;
  }

  .e {
    width: 500px;
    height: 1px;
    background: svg(square);
  }

  .f {
    width: 500px;
    height: 50px;
    border-bottom: 1px solid black;
  }
}

[w-188-246] {
  width: 500px;
}
[w-188-246] {
  aspect-ratio: '1:1';
}
[w-150-150] {
  width: 300px;
  background: green;
}
[w-150-150] {
  aspect-ratio: '1:1'
}

</style>
