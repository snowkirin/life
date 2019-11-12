<template>
    <FlexboxLayout class="card">
        <StackLayout>
            <Label text="안녕 난 이미지라고 해" />
        </StackLayout>
    </FlexboxLayout>
</template>

<script>
    export default {
        props: {
            data: {
                type: Object
            }
        },
    };
</script>
