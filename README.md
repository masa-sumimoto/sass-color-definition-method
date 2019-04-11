# SASS Color Definition Method
This is my color definition method using SASS.

![Capture1](https://github.com/masa-sumimoto/sass-color-definition-method/blob/master/env_files/images/capture-1.png)

## About the method
I use the brightness. I can get brighter colors than the base color in this way, along with the base color.

The following flow shows an example of obtaining 10 scale of color.

### Step1
Prepare a function to get the gradual color using brightness.
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
```
@function colors($key) {
  @return map-get($colors, $key);
}
```

### Step3
Prepare a map for all of colors.
```
$colors: ();
```

### Step4
Prepare a color object. 
It should contain the hex and rgb information.
```
$color-red: (hex: #f00, r: 255, g: 0, b: 0);
```

### Step5
Use the map-merge function to add the required colors to `$colors`. I often use Bootstrap, so naming convention of keys will be like Bootstrap.  
(xxx-900, xxx-800...)
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

### Step6
Let's create utility classes. In the following sample, I am creating classes for background and for color using `$colors`.
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

### Step7
Let's create also any classes. In the following sample, I referred to a specific color directly using `colors()`.
```
.top-foo-parts {
  color: colors("red-900");
  background-color: colors("black-200");
}
```
