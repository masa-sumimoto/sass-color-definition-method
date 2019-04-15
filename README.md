# SASS Color Definition Method
This is my color definition method using SASS. The way uses `Brightness Colors` .  
You can get brighter colors than the base color, along with the base color automatically.
I will show how to create the situation and haw to use these colors.

![Capture1](https://github.com/masa-sumimoto/sass-color-definition-method/blob/master/env_files/images/capture-1.png)


## Please tell me how to use the colors first.
OK. You can use your definition colors with 2 ways.

### Way 1
SASS has `map` data type. You can register all of your collection colors to map.
In the following example, map named `$colors` and $each method are used in like utilitic style.  
※ $colors has your collection colors.

```
@each $color, $value in $colors {
  .bg-#{$color} {
    background-color: $value !important;
  }
}

@each $color, $value in $colors {
  .text-#{$color} {
    color: $value !important;
  }
}
```

### Way 2
Another Way. Let's use the `colors()` function that calls `$colors`.  
It can be used anytime anywhere.
```
.top-foo-parts {
  color: colors("red-900");
  background-color: colors("black-200");
}
```

:star: (^ 0^)/ :star2:  

## OK! What should I do to use the ways?
Yes. You need to be prepared to use these methods.  
The following steps show an example of setting red 10 scale colors.


### Step1
Prepare a function to get the gradual color using brightness.
This is core function. You can get scale colors with this.

```
@function get-scale-color($color-info, $scaleLength, $percent) {
  $r: map-get($color-info, r);
  $g: map-get($color-info, g);
  $b: map-get($color-info, b);
  $ratio: $scaleLength - ($percent / 10);
  $result-r: $r + ((255 - $r) / $scaleLength) * $ratio;
  $result-g: $g + ((255 - $g) / $scaleLength) * $ratio;
  $result-b: $b + ((255 - $b) / $scaleLength) * $ratio;

  @return rgb($result-r, $result-g, $result-b);
}
```

### Step2
Prepare a function that when you want to get color as any properties value.  
( You have already see this is used in stylesheet. )
```
@function colors($key) {
  @return map-get($colors, $key);
}
```

### Step3
Prepare a map for all of colors.  
( You register your colors to here. )
```
$colors: ();
```

### Step4
Difine a color object!
It should contain the hex and rgb information.  
( This color is a base color! )
```
$color-red: (hex: #f00, r: 255, g: 0, b: 0);
```

### Step5
Use the `map-merge` function to add scale colors to `$colors`. 
```
$colors: map-merge(
  (
    "red": map-get($color-red, hex),
    "red-900": get-scale-color($color-red, 10, 90),
    "red-800": get-scale-color($color-red, 10, 80),
    "red-700": get-scale-color($color-red, 10, 70),
    "red-600": get-scale-color($color-red, 10, 60),
    "red-500": get-scale-color($color-red, 10, 50),
    "red-400": get-scale-color($color-red, 10, 40),
    "red-300": get-scale-color($color-red, 10, 30),
    "red-200": get-scale-color($color-red, 10, 20),
    "red-100": get-scale-color($color-red, 10, 10),
  ),
  $colors
);
```
- Get hex color for base color named `red`.
- Use `get-scale-color` function for children brightness colors.
- Pass `Base color object`, `Scale division length`, `Approximate value with Base color (%)` to `get-scale-color` for children.
- note: I often use Bootstrap name style like xxx-900, xxx-800... as map key.


:innocent: Tanks Reading!! :v:
