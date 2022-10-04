<template>
    <div :class="[col]">
        <div :class="['card border-0 rounded-sm pr-4 pl-4', bgcard]">
            <div class="row no-gutters cardInfo-main-container">
                <div class="col-md-3 d-flex justify-content-center align-items-center">
                    <div class="cardInfo-icon-container d-flex justify-content-center align-items-center">
                        <i :class="[icon, color]"></i>
                        <!-- <img :src="icon" class="" alt="" :width="size"> -->
                    </div>
                </div>
                <div class="col-md-6 d-flex align-items-center">
                    <div class="cardInfo-data-container pt-2">
                        <h5 :class="['cardInfo-title m-0 pr-2 pl-2', color]">{{title}}</h5>
                        <p :class="['cardInfo-data m-0 pr-2 pl-2', color]">{{data}}</p>
                    </div>
                </div>
                <div class="col-md-3 d-flex justify-content-center align-items-center">
                    <div class="cardInfo-arrow-container d-flex justify-content-center align-items-center">
                        <a :href="link">
                            <img v-if="color === 'text-white'" :src="require('@/assets/img/white-icon-arrow-long.svg')" class="" alt="" width="21">
                            <img v-if="color !== 'text-white'" :src="require('@/assets/img/icon-arrow-long.svg')" class="" alt="" width="21">
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: [
        'icon',
        'title',
        'data',
        'link',
        'col',
        'size',
        'bgcard',
        'color'
    ] 
}
</script>
<style>

.card {
    -webkit-box-shadow: 6px 5px 24px 0px rgba(0,0,0,0.05);
    -moz-box-shadow: 6px 5px 24px 0px rgba(0,0,0,0.05);
    box-shadow: 6px 5px 24px 0px rgba(0,0,0,0.05);
    color: #fff;
}

.cardInfo-main-container {
    height: 150px;
}

.cardInfo-data-container{
    height: 60px;
}

.bg-bswdigital .cardInfo-icon-container {
    width: 60px;
    height: 60px;
    background: rgba(255,255,255,0.2);
    border-radius: 7px;
}

.bg-white .cardInfo-icon-container {
    width: 60px;
    height: 60px;
    background: #f6f4fc;
    border-radius: 7px;
}

.cardInfo-arrow-container {
    width: 60px;
    height: 60px;
}

.cardInfo-title {
    font-size: 18px;
    font-weight: bold;
    color: #10101A;
}

.cardInfo-data {
    font-size: 14px;
    color: #10101A;
}

</style>