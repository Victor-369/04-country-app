import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class CountrySearchInputComponent {
  placeholder = input<string>('Buscar');  // Si no lo encuentra pondrá como valor por defecto "Buscar"
  debounceTime = input(300);
  value = output<string>();

  initialValue = input<string>();
  inputValue = linkedSignal<string>(() => this.initialValue() ?? ''); // Inicia la señal con algún tipo de proceso, luego se convierte en una señal común

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();

    const timeout = setTimeout(() => {
      this.value.emit(value);
    }, this.debounceTime());

    onCleanup(() => {
      clearTimeout(timeout);
    });
  });
}
